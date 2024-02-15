import type { Request, Response } from 'express';

import type { ExpressAPIErrorResponse } from '@rebel-hub/service-tools';
import { sendSuccessResponse } from '@rebel-hub/service-tools';

import type { QueryHandlers } from '~/application/bootstrap';

type Dependencies = {
  getUserById: QueryHandlers['getUserById'];
};
type RequestParams = Record<string, unknown>;
type RequestBody = Record<string, unknown>;
type RequestQuery = Record<string, unknown>;
type ResponseBody = {
  user: Awaited<ReturnType<QueryHandlers['getUserById']>>;
};
type Req = Request<RequestParams, ResponseBody, RequestBody, RequestQuery>;
type Res = Response<ResponseBody | ExpressAPIErrorResponse>;

export const getMeRequestHandler =
  ({ getUserById }: Dependencies) =>
  async (req: Req, res: Res): Promise<Res> => {
    const { authPassport } = req;

    const user = await getUserById({ authPassport });

    return sendSuccessResponse(res, { user });
  };
