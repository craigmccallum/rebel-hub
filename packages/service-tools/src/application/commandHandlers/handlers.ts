import { DomainEvent } from '~/domain/events/domainEvents';
import { publishEvent } from '~/infrastructure/services/inMemoryMessagingService';

/**
 * Given fetchState, deriveDomainEvent and processDomainEvent functions, creates a standardised command handler
 * which abstracts the plumbing required to call/chain these functions and publish the event to
 * be picked up by other parts of the system.
 *
 * Additionally, provides strict TS guard rails which ensure each functions conform to the
 * currently accepted standards.
 */
export const createCommandHandler =
  <
    TDeriverArgs extends {
      data: Record<string, unknown>;
      state: Record<string, unknown>;
    },
    TDeriverEvent extends DomainEvent,
    THandlerDependencies extends Record<string, unknown>,
    THandlerData extends TDeriverArgs['data'],
  >(handlerFns: {
    parseData: (args: { data: THandlerData }) => THandlerData;
    fetchState: (args: {
      dependencies: THandlerDependencies;
      data: THandlerData;
    }) => Promise<TDeriverArgs['state']>;
    deriveDomainEvent: (args: {
      data: TDeriverArgs['data'];
      state: TDeriverArgs['state'];
    }) => Promise<TDeriverEvent>;
    processDomainEvent: (args: {
      dependencies: THandlerDependencies;
      state: TDeriverArgs['state'];
      domainEvent: TDeriverEvent;
    }) => Promise<void>;
  }) =>
  (dependencies: THandlerDependencies) =>
  async (commandData: THandlerData): Promise<TDeriverEvent> => {
    const { parseData, fetchState, deriveDomainEvent, processDomainEvent } = handlerFns;

    const data = parseData({ data: commandData });
    const state = await fetchState({ dependencies, data });
    const domainEvent = await deriveDomainEvent({ data, state });
    await processDomainEvent({ dependencies, state, domainEvent });

    publishEvent(domainEvent);

    return domainEvent;
  };
