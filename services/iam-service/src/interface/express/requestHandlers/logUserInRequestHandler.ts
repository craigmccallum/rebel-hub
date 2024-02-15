import type { Request, Response } from 'express';

import { exhaustiveSwitchGuard } from '@rebel-hub/service-tools';

import type { CommandHandlers } from '~/application/bootstrap';

type Dependencies = {
  logUserIn: CommandHandlers['logUserIn'];
};
type RequestParams = Record<string, unknown>;
type RequestBody = {
  email: string;
  phoneNumber?: string;
  rawPassword: string;
};
type ResponseBody = {
  accessToken: string;
};
type RequestQuery = Record<string, unknown>;
type Req = Request<RequestParams, ResponseBody, RequestBody, RequestQuery>;
type Res = Response<ResponseBody | ExpressAPIErrorResponse>;

export const logUserInRequestHandler =
  ({ logUserIn }: Dependencies) =>
  async (req: Req, res: Res) => {
    const { email, phoneNumber, rawPassword } = req.body;

    const event = await logUserIn({
      email,
      phoneNumber: phoneNumber ?? null,
      rawPassword,
    });

    switch (event.type) {
      case 'DE/IAM/AUTH_PASSPORT/AUTH_PASSPORT_GENERATION_FAILED/USER_DEACTIVATED':
        return sendUnauthorizedResponse(res, '');
      case 'USER/':
        const responseCookie: ExpressResponseCookie[] = [
          {
            name: 'accessToken',
            value: event.payload.accessToken,
            options: {
              maxAge: 100000,
              httpOnly: true,
            },
          },
        ];
        return sendSuccessResponse(res, {}, responseCookie);
      default:
        return exhaustiveSwitchGuard(event);
    }
  };
