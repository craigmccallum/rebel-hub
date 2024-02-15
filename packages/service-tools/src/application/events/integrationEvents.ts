import { nanoid } from 'nanoid';

type IntegrationEventData<
  TContext extends Uppercase<string> = Uppercase<string>,
  TVersion extends `${string}.${string}` = `${string}.${string}`,
  TType extends Uppercase<string> = Uppercase<string>,
  TPayload extends Record<string, unknown> = Record<string, unknown>,
> = {
  metadata: {
    boundedContext: TContext;
    version: TVersion;
  };
  type: TType;
  payload: TPayload;
};

/**
 * Defines the standard format for integration events published beyond a bounded context
 *
 * @example
 *
 * {
 *   metadata: {
 *     id: 'DpP5R9bqOT3vW495i-riz',
 *     timestamp: 1692628636,
 *     version: '1.0',
 *     boundedContext "iam"
 *   },
 *   type: 'IE/IAM/USER_REGISTERED',
 *   payload: {
 *     id: 'user-WLZVeuaEHb3hkwneNewcQ',
 *     email: 'user@example.com',
 *   }
 * }
 */
export type IntegrationEvent<TData extends IntegrationEventData = IntegrationEventData> = {
  metadata: {
    eventId: string;
    timestamp: number;
    version: TData['metadata']['version'];
    boundedContext: TData['metadata']['boundedContext'];
  };
  type: `IE/${TData['metadata']['boundedContext']}/${TData['type']}`;
  payload: TData['payload'];
};

export const generateIntegrationEventId = () => nanoid();
export const generateIntegrationEventTimestamp = () => Date.now();
