import { BaseError } from '../../common/errors';

export class InvalidAggregateError extends BaseError {
  constructor(internalErrorDetails: string) {
    super({
      internalErrorDetails,
      externalErrorDetails: 'Oops, something went wrong',
      severity: 'info',
    });
  }
}
