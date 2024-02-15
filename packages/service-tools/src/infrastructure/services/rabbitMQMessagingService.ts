// import amqplib from 'amqplib';

// import { UnexpectedError } from '~/common/errors';
// import {
//   DomainEventSubscriberService,
//   IntegrationEventPublisherService,
//   IntegrationEventSubscriberService,
// } from '~/core/events/eventClient';

// export const createRabbitMQChannel = async (connectionUrl: string, exchangeName: string) => {
//   try {
//     const connection = await amqplib.connect(connectionUrl);
//     const channel = await connection.createChannel();
//     await channel.assertExchange(exchangeName, 'direct', {
//       durable: true,
//     });
//     await channel.prefetch(5);
//     return channel;
//   } catch (error) {
//     throw new UnexpectedError(error);
//   }
// };

// type Logger = {
//   logInfo: (message: string, ...rest: unknown[]) => void;
//   logError: (message: string, ...rest: unknown[]) => void;
// };

// export const createRabbitMQDomainEventSubscriber = async (
//   connectionUrl: string,
//   exchangeName: string,
//   subscribingContext: string,
//   logger: Logger
// ): Promise<DomainEventSubscriberService> => {
//   try {
//     const channel = await createRabbitMQChannel(connectionUrl, exchangeName);
//     channel.assertQueue(subscribingContext);
//     return {
//       subscribe: async (type, handlers) => {
//         channel.bindQueue(subscribingContext, 'rebel-hub', type);
//         Object.entries(handlers).forEach(([eventHandlerName, handleEvent]) => {
//           channel.consume(subscribingContext, (msg) => {
//             if (!msg) {
//               return;
//             }
//             const payload = JSON.parse(msg.content.toString());

//             try {
//               handleEvent(payload);
//               channel.ack(msg);
//               logger.logInfo(
//                 `>>> ${subscribingContext} bounded context handler ${eventHandlerName} successfully handled ${type} event with id: ${JSON.stringify(
//                   payload.eventId
//                 )} `
//               );
//             } catch (error) {
//               logger.logError(
//                 `>>> ${subscribingContext} bounded context handler ${eventHandlerName} failed to handle ${type} event with id: ${JSON.stringify(
//                   payload.eventId
//                 )}, error: ${e} `
//               );
//             }
//           });
//         });
//       },
//     };
//   } catch (error) {
//     throw new UnexpectedError(error);
//   }
// };

// export const createRabbitMQEventPublisher = async (
//   connectionUrl: string,
//   exchangeName: string,
//   logger: Logger
// ): Promise<IntegrationEventPublisherService> => {
//   try {
//     const channel = await createRabbitMQChannel(connectionUrl, exchangeName);
//     return {
//       publish: async (event) => {
//         const { type, payload } = event;
//         const eventDataString = JSON.stringify(payload);

//         channel.publish(exchangeName, type, Buffer.from(eventDataString), {
//           persistent: true,
//         });

//         logger.logInfo(`>>> ${type} event published with payload: ${eventDataString}`);
//       },
//     };
//   } catch (error) {
//     throw new UnexpectedError(error);
//   }
// };

// export const createRabbitMQIntegrationEventSubscriber = async (
//   connectionUrl: string,
//   exchangeName: string,
//   subscribingContext: string,
//   logger: Logger
// ): Promise<IntegrationEventSubscriberService> => {
//   try {
//     const channel = await createRabbitMQChannel(connectionUrl, exchangeName);
//     channel.assertQueue(subscribingContext);
//     return {
//       subscribe: async (type, handlers) => {
//         channel.bindQueue(subscribingContext, 'rebel-hub', type);
//         Object.entries(handlers).forEach(([eventHandlerName, handleEvent]) => {
//           channel.consume(subscribingContext, (msg) => {
//             if (!msg) {
//               return;
//             }
//             const payload = JSON.parse(msg.content.toString());

//             try {
//               handleEvent(payload);
//               channel.ack(msg);
//               logger.logInfo(
//                 `>>> ${subscribingContext} bounded context handler ${eventHandlerName} successfully handled ${type} event with id: ${JSON.stringify(
//                   payload.eventId
//                 )} `
//               );
//             } catch (error) {
//               logger.logError(
//                 `>>> ${subscribingContext} bounded context handler ${eventHandlerName} failed to handle ${type} event with id: ${JSON.stringify(
//                   payload.eventId
//                 )}, error: ${e} `
//               );
//             }
//           });
//         });
//       },
//     };
//   } catch (error) {
//     throw new UnexpectedError(error);
//   }
// };
