import { type NextFunction, type Request, type Response } from 'express';

import { identifyClient, type KnownClients } from '../../clients';

export const allowClients =
  (allowedClients: KnownClients[]) => (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.headers['client-id'];
    const clientType = identifyClient(clientId as string);
    if (allowedClients.includes(clientType)) {
      return next();
    }
    return res.status(401).json({
      error: `${clientType} client does not have permission to access this resource`,
    });
  };
