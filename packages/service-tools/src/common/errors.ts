export type ErrorProperties = {
  internalErrorDetails: string;
  externalErrorDetails: string;
  severity: 'error' | 'info';
};

export class BaseError extends Error {
  properties: ErrorProperties;

  constructor(properties: ErrorProperties) {
    super(JSON.stringify(properties.internalErrorDetails));

    this.properties = properties;

    /**
     * This sets the name property to the extending class name for stack trace purposes.
     * e.g. the name property for an error class defined as 'class ExampleError extends BaseError {}' will be ExampleError
     */
    this.name = new.target.name || this.constructor.name;

    /**
     * Notes about the following call:
     * 1. Explicitly calling captureStackTrace results in the actual error class name showing up in the stack trace rather than 'Error'
     * 2. By passing BaseError as the second parameter, the construction of the actual error and the construction of BaseError are ommitted from the stack trace, making it a little cleaner. See here for more info: https://nodejs.org/api/errors.html#errorcapturestacktracetargetobject-constructoropt
     */
    Error.captureStackTrace(this, BaseError);
  }
}

export class UnexpectedError extends BaseError {
  constructor(error: string) {
    super({
      internalErrorDetails: error,
      externalErrorDetails: 'Oops! Something went wrong. Please try again later.',
      severity: 'error',
    });
  }
}
