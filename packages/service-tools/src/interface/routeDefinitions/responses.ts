import { z } from 'zod';

import { formatZodError } from '~/common/zod';

// Types
// -----

// Cookies
export type ResponseCookie = {
  name: string;
  value: string;
  options: {
    /** Specifies the cookie expiry date, in UTC time*/
    expiresAt: Date;
    /** Specifies the cookie should be HTTP only*/
    httpOnly: boolean;
    /** Specifies if the cookie should only be used with HTTPS. */
    secure: boolean;
    /** Specifies the cookie path*/
    path?: string;
    /** Specifies the cookie domain. */
    domain?: string;
  };
};

// Supported response
export type SuccessResponse<
  TData extends Record<string, unknown>,
  TCookies extends ResponseCookie[] = ResponseCookie[],
> = {
  status: 200;
  data?: TData;
  cookies?: TCookies;
};
export type RedirectResponse<TCookies extends ResponseCookie[] = ResponseCookie[]> = {
  status: 301; // Moved Permanently
  data: undefined;
  cookies: undefined;
};
export type ClientErrorResponse<TCookies extends ResponseCookie[] = ResponseCookie[]> = {
  status:
    | 400 // Bad Request
    | 401 // Unauthorized
    | 403 // Forbidden
    | 404 // Not Found
    | 409 // Conflict
    | 422; // Unprocessable Content
  data: {
    error: string;
  };
  cookies?: TCookies;
};
export type ServerErrorResponse<TCookies extends ResponseCookie[] = ResponseCookie[]> = {
  status: 500; // Internal Server Error
  data: {
    error: string;
  };
  cookies: undefined;
};

// Route Definition response
export type RouteDefinitionResponse<TResponseBodySchema extends z.AnyZodObject = z.AnyZodObject> =
  ReturnType<typeof routeDefinitionResponseFns<TResponseBodySchema>>;

// Utils
// -----

export const routeDefinitionResponseFns = <TResponseBodySchema extends z.AnyZodObject>(
  successResponseBodySchema?: TResponseBodySchema,
) => ({
  success: (
    data?: z.infer<TResponseBodySchema>,
    cookies?: ResponseCookie[],
  ): SuccessResponse<z.infer<TResponseBodySchema>> | ServerErrorResponse => {
    if (data && !successResponseBodySchema) {
      console.error('No response body validation schema was provided');
      return {
        status: 500,
        data: {
          error: 'Something went wrong',
        },
        cookies: undefined,
      };
    }

    if (!successResponseBodySchema) {
      return {
        status: 200,
        data,
        cookies,
      };
    }

    const result = successResponseBodySchema.safeParse(data);
    if (!result.success) {
      const error = formatZodError(result.error);
      console.error(error);
      return {
        status: 500,
        data: {
          error: 'Something went wrong',
        },
        cookies: undefined,
      };
    }

    return {
      status: 200,
      data: result.data,
      cookies,
    };
  },
  movedPermenantly: (): RedirectResponse => ({
    status: 301,
    data: undefined,
    cookies: undefined,
  }),
  badRequest: (error: string, cookies?: ResponseCookie[]): ClientErrorResponse => {
    return {
      status: 400,
      data: {
        error: `Bad Request: ${error}`,
      },
      cookies: cookies,
    };
  },
  unauthorised: (error: string, cookies?: ResponseCookie[]): ClientErrorResponse => {
    return {
      status: 401,
      data: {
        error: `Unauthorised: ${error}`,
      },
      cookies: cookies,
    };
  },
  forbidden: (error: string, cookies?: ResponseCookie[]): ClientErrorResponse => {
    return {
      status: 403,
      data: {
        error: `Forbidden: ${error}`,
      },
      cookies: cookies,
    };
  },
  notFound: (error: string, cookies?: ResponseCookie[]): ClientErrorResponse => {
    return {
      status: 404,
      data: {
        error: `Not Found: ${error}`,
      },
      cookies: cookies,
    };
  },
  conflict: (error: string, cookies?: ResponseCookie[]): ClientErrorResponse => {
    return {
      status: 409,
      data: {
        error: `Conflict: ${error}`,
      },
      cookies: cookies,
    };
  },
  unprocessableContent: (error: string, cookies?: ResponseCookie[]): ClientErrorResponse => {
    return {
      status: 409,
      data: {
        error: `Unprocessable Content: ${error}`,
      },
      cookies: cookies,
    };
  },
  internalServerError: (): ServerErrorResponse => {
    return {
      status: 500,
      data: {
        error: 'Something went wrong',
      },
      cookies: undefined,
    };
  },
});
