import { BaseError } from '../../common/errors';

export class InvalidQueryDataError extends BaseError {
  constructor(internalErrorDetails: string, externalErrorDetails: string) {
    super({
      internalErrorDetails,
      externalErrorDetails,
      severity: 'info',
    });
  }
}

export class InvalidQueryDTOError extends BaseError {
  constructor(internalErrorDetails: string, externalErrorDetails: string) {
    super({
      internalErrorDetails,
      externalErrorDetails,
      severity: 'info',
    });
  }
}
