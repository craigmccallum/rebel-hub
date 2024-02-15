import EventEmitter from 'node:events';

import { type ScreamingSnakeCase } from 'type-fest';
import { DomainEventPublisherService } from '~/application/events/eventServices';
import { DomainEvent } from '~/domain/events/domainEvents';

const eventEmitter = new EventEmitter();

/**
 * Publishes an event
 */
export const publishEvent = <TEvent extends DomainEvent>(event: TEvent) => {
  eventEmitter.emit(event.type, event.payload || {});

  console.log(`${event.type} published with payload ${JSON.stringify(event.payload ?? {})}`);
};

/**
 * Subscribes to an event by it's type - handlers are run assynchronously
 */
export const createEventSubscriber =
  <TSubscribableEvents extends DomainEvent>() =>
  <
    TEventType extends TSubscribableEvents['type'],
    TEvent extends Extract<TSubscribableEvents, { type: TEventType }>,
  >(args: {
    type: TEventType;
    handlers: Record<
      ScreamingSnakeCase<string>,
      (eventPayload: TEvent['payload']) => Promise<void>
    >;
  }) => {
    const { type: eventType, handlers } = args;

    Object.entries(handlers).forEach(([handlerName, handler]) => {
      const handleEvent = async (eventPayload: TEvent['payload']) => {
        try {
          await handler(eventPayload);
          console.log(
            `${handlerName} successfully handled ${eventType} with payload ${JSON.stringify(
              eventPayload ?? {},
            )}`,
          );
        } catch (e) {
          console.log(
            `${handlerName} failed to handle ${eventType} with payload ${JSON.stringify(
              eventPayload ?? {},
            )}`,
          );
        }
      };

      eventEmitter.on(eventType, handleEvent);
    });
  };
