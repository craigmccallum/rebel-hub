import type { Request, Response } from 'express';

import type { ExpressAPIErrorResponse } from '@rebel-hub/service-tools';
import { sendSuccessResponse } from '@rebel-hub/service-tools';

import type { CommandHandlers } from '~/application/bootstrap';

type Dependencies = {
  logUserOut: CommandHandlers['logUserOut'];
};
type RequestParams = Record<string, unknown>;
type RequestBody = Record<string, unknown>;
type RequestQuery = Record<string, unknown>;
type ResponseBody = Record<string, unknown>;
type Req = Request<RequestParams, ResponseBody, RequestBody, RequestQuery>;
type Res = Response<ResponseBody | ExpressAPIErrorResponse>;

export const logUserOutRequestHandler =
  ({ logUserOut }: Dependencies) =>
  async (req: Req, res: Res): Promise<Res> => {
    const { authPassport } = req;

    await logUserOut({ authPassport });

    // Return standard logout response regardless of event
    res.clearCookie('accessToken');
    return sendSuccessResponse(res);
  };
