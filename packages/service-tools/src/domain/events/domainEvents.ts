import { nanoid } from 'nanoid';

type DomainEventData<
  TBoundedContext extends Uppercase<string> = Uppercase<string>,
  TAggregateType extends Uppercase<string> = Uppercase<string>,
  TAggregateId extends string | null = string | null,
  TType extends Uppercase<string> = Uppercase<string>,
  TPayload extends Record<string, unknown> = Record<string, unknown>,
> = {
  metadata: {
    boundedContext: TBoundedContext;
    aggregateType: TAggregateType;
    aggregateId: TAggregateId;
  };
  type: TType;
  payload: TPayload;
};

/**
 * Defines the standard format for domain events published within a bounded context
 *
 * @example
 *
 * {
 *   metadata: {
 *     eventId: 'DpP5R9bqOT3vW495i-riz',
 *     timestamp: 1692628636,
 *     boundedContext: 'IAM',
 *     aggregateType: 'USER',
 *     aggregateId: 'user-abc123'
 *   },
 *   type: 'DE/IAM/USER/USER_REGISTERED',
 *   payload: {
 *     id: 'user-abc123',
 *     email: 'user@example.com',
 *     password: 'Xc738xs_122s'
 *   },
 * }
 */
export type DomainEvent<TData extends DomainEventData = DomainEventData> = {
  metadata: {
    eventId: string;
    timestamp: number;
    boundedContext: TData['metadata']['boundedContext'];
    aggregateType: TData['metadata']['aggregateType'];
    aggregateId: TData['metadata']['aggregateId'];
  };
  type: `DE/${TData['metadata']['boundedContext']}/${TData['metadata']['aggregateType']}/${TData['type']}`;
  payload: TData['payload'];
};

export const generateDomainEventId = () => nanoid();
export const generateDomainEventTimestamp = () => Date.now();
