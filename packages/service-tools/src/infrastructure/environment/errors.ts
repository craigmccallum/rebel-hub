import { BaseError } from '../../common/errors';

export class InvalidEnvVarsError extends BaseError {
  constructor(internalErrorDetails: string, externalErrorDetails: string) {
    super({
      internalErrorDetails,
      externalErrorDetails,
      severity: 'info',
    });
  }
}
