import { type IntegrationEventSubscriberService } from '@rebel-hub/service-tools';

import type { CommandHandlers } from '../bootstrap';

export const setUpEventSubscribers = async (
  _eventSubscriber: IntegrationEventSubscriberService,
  _CommandHandlers: CommandHandlers,
) => {
  // eventSubscriber.subscribe({
  //   eventName: 'SOME_EVENT',
  //   eventHandlers: {
  //     doSomething: () => CommandHandlers.doSomething(),
  //   },
  // });
};
