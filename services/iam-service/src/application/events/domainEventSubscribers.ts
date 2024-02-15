import { type DomainEventSubscriberService } from '@rebel-hub/service-tools';

import type { CommandHandlers } from '../bootstrap';

export const setUpDomainEventSubscribers = async (
  _eventSubscriber: DomainEventSubscriberService,
  _CommandHandlers: CommandHandlers,
) => {
  // eventSubscriber.subscribe({
  //   eventName: 'SOME_EVENT',
  //   eventHandlers: {
  //     doSomething: () => CommandHandlers.doSomething(),
  //   },
  // });
};
