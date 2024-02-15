import { EachMessagePayload, Kafka } from 'kafkajs';
import {
  DomainEventPublisherService,
  DomainEventSubscriberService,
  IntegrationEventPublisherService,
  IntegrationEventSubscriberService,
} from '~/application/events/eventServices';

type Logger = {
  logInfo: (message: string, ...rest: unknown[]) => void;
  logError: (message: string, ...rest: unknown[]) => void;
};

const createKafkaInstance = (clientId: string, brokers: string[]) =>
  new Kafka({
    clientId,
    brokers,
    ssl: false,
  });

export const createKafkaDomainEventPublisher = async (
  clientId: string,
  brokerUrls: string[],
  logger: Logger,
): Promise<DomainEventPublisherService> => {
  const kafka = createKafkaInstance(clientId, brokerUrls);
  const producer = kafka.producer();
  await producer.connect();

  return {
    publish: async (event) => {
      const payload = JSON.stringify(event.payload);

      producer.send({
        topic: event.metadata.aggregateType,
        messages: [
          {
            headers: {
              eventId: event.metadata.eventId,
              timestamp: `${event.metadata.timestamp}`,
              aggregateId: `${event.metadata.aggregateId}`,
            },
            key: event.metadata.aggregateId,
            value: JSON.stringify({
              type: event.type,
              payload: payload,
            }),
          },
        ],
      });

      logger.logInfo(`>>> ${event.type} event published with payload: ${payload}`);
    },
  };
};

export const createKafkaDomainEventSubscriber = async (
  clientId: string,
  brokerUrls: string[],
  groupId: string,
  topic: string,
  logger: Logger,
): Promise<DomainEventSubscriberService> => {
  const kafka = createKafkaInstance(clientId, brokerUrls);
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  await consumer.subscribe({ topic });

  return {
    subscribe: async (type, eventHandlers) => {
      await consumer.run({
        eachMessage: async ({ message }: EachMessagePayload) => {
          const payload = (message.value && JSON.parse(message.value.toString())) ?? {};
          if (payload.type !== type) return;

          Object.entries(eventHandlers).forEach(([eventHandlerName, handleEvent]) => {
            try {
              handleEvent(payload);
              logger.logInfo(
                `>>> ${clientId} handler ${eventHandlerName} successfully handled ${type} event with id: ${JSON.stringify(
                  payload.eventId,
                )} `,
              );
            } catch (error) {
              logger.logError(
                `>>> ${clientId} handler ${eventHandlerName} failed to handle ${type} event with id: ${JSON.stringify(
                  payload.eventId,
                )}, error: ${error} `,
              );
            }
          });
        },
      });
    },
  };
};

export const createKafkaIntegrationEventPublisher = async (
  clientId: string,
  brokerUrls: string[],
  logger: Logger,
): Promise<IntegrationEventPublisherService> => {
  const kafka = createKafkaInstance(clientId, brokerUrls);
  const producer = kafka.producer();
  await producer.connect();

  return {
    publish: async (event) => {
      const payload = JSON.stringify(event.payload);

      producer.send({
        topic: event.metadata.boundedContext,
        messages: [
          {
            headers: {
              eventId: event.metadata.eventId,
              timestamp: `${event.metadata.timestamp}`,
              version: `${event.metadata.version}`,
            },
            key: event.metadata.boundedContext,
            value: JSON.stringify({
              type: event.type,
              payload,
            }),
          },
        ],
      });

      logger.logInfo(`>>> ${event.type} event published with payload: ${payload}`);
    },
  };
};

export const createKafkaIntegrationEventSubscriber = async (
  clientId: string,
  brokerUrls: string[],
  groupId: string,
  topic: string,
  logger: Logger,
): Promise<IntegrationEventSubscriberService> => {
  const kafka = createKafkaInstance(clientId, brokerUrls);
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  await consumer.subscribe({ topic });

  return {
    subscribe: async (type, eventHandlers) => {
      await consumer.run({
        eachMessage: async ({ message }: EachMessagePayload) => {
          const payload = (message.value && JSON.parse(message.value.toString())) ?? {};
          if (payload.type !== type) return;

          Object.entries(eventHandlers).forEach(([eventHandlerName, handleEvent]) => {
            try {
              handleEvent(payload);
              logger.logInfo(
                `>>> ${clientId} handler ${eventHandlerName} successfully handled ${type} event with id: ${JSON.stringify(
                  payload.eventId,
                )} `,
              );
            } catch (error) {
              logger.logError(
                `>>> ${clientId} handler ${eventHandlerName} failed to handle ${type} event with id: ${JSON.stringify(
                  payload.eventId,
                )}, error: ${error} `,
              );
            }
          });
        },
      });
    },
  };
};
