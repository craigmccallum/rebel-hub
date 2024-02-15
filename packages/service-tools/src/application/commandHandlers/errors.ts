import { BaseError, ErrorProperties } from '../../common/errors';

export class InvalidCommandDataError extends BaseError {
  constructor(internalErrorDetails: string, externalErrorDetails: string) {
    super({
      internalErrorDetails,
      externalErrorDetails,
      severity: 'info',
    });
  }
}

export class CommandStateError extends BaseError {
  constructor(
    internalErrorDetails: string,
    externalErrorDetails: string,
    severity: ErrorProperties['severity'],
  ) {
    super({
      internalErrorDetails,
      externalErrorDetails,
      severity,
    });
  }
}
