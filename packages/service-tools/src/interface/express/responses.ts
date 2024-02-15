import type { CookieOptions, Response } from 'express';

export type ExpressResponseCookie = {
  name: string;
  value: string;
  options: CookieOptions;
};

type ExpressSuccessResponseData = Record<string, unknown>;

export type ExpressErrorResponseData = {
  error: string;
};

export const sendExpressResponse = (
  res: Response,
  status: number,
  data?: ExpressSuccessResponseData | ExpressErrorResponseData,
  cookies?: ExpressResponseCookie[],
) => {
  res.status(status);

  cookies?.forEach((cookie) => {
    res.cookie(cookie.name, cookie.value, {
      ...cookie.options,
    });
  });

  return res.json(data ?? {});
};
