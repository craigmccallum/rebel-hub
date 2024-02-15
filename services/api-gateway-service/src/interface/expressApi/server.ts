import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import type { Application, ErrorRequestHandler } from 'express';
import express from 'express';
import helmet from 'helmet';
import httpProxy from 'http-proxy';
import morgan from 'morgan';

export type ServiceUrls = {
  gatewayServiceUrl: string;
  iamServiceUrl: string;
};

export type ClientUrls = {
  webClientUrl: string;
};

export const createExpressServer = (
  environment: 'development' | 'staging' | 'production',
  serviceUrls: ServiceUrls,
  clientUrls: ClientUrls,
) => {
  const { gatewayServiceUrl, iamServiceUrl } = serviceUrls;
  const { webClientUrl } = clientUrls;

  const expressServer: Application = express();

  expressServer.use(express.json());

  expressServer.use(cookieParser());

  const corsWhitelist = [webClientUrl || ''];
  expressServer.use(cors({ origin: corsWhitelist, credentials: true }));

  morgan.token('userId', (req) => {
    return req.authPassport?.userId ?? 'Unauthenticated';
  });
  expressServer.use(
    morgan(
      environment === 'development'
        ? ':userId :method :url :status :response-time ms - :res[content-length]'
        : ':userId :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms',
    ),
  );

  expressServer.use(compression());

  expressServer.use(helmet());

  expressServer.use((req, res, next) => {
    try {
      if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send({ error: 'content-type header must be application/json' });
      }
      next();
    } catch (error) {
      next(error);
    }
  });

  expressServer.use((req, _res, next) => {
    try {
      req.headers['origin'] = gatewayServiceUrl;
      next();
    } catch (error) {
      next(error);
    }
  });

  const authProxy = httpProxy.createProxyServer();
  authProxy.on('proxyReq', function (proxyReq, req) {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  });
  expressServer.use(async (req, res, next) => {
    try {
      authProxy.on('proxyRes', function (authResponse) {
        const body: Buffer[] = [];
        authResponse.on('data', function (chunk) {
          body.push(chunk);
        });
        authResponse.on('end', function () {
          const bufferBody = Buffer.concat(body).toString();
          const parsedBody = bufferBody ? JSON.parse(bufferBody) : {};
          const authPassport = parsedBody?.authPassport ?? { userId: null };
          req.authPassport = authPassport;
          req.headers['user-passport'] = JSON.stringify(authPassport);
          return next();
        });
      });
      authProxy.web(req, res, {
        target: `${iamServiceUrl}/api/v1/iam/authenticate`,
        selfHandleResponse: true,
        ignorePath: true,
      });
    } catch (error) {
      res.status(403).send({ error: 'Access Denied' });
    }
  });

  const serviceProxy = httpProxy.createProxyServer();
  serviceProxy.on('proxyReq', function (proxyReq, req) {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  });
  const services = [
    {
      name: 'iam',
      apiVersion: '1',
      uri: iamServiceUrl,
    },
  ];
  services.forEach((service) => {
    expressServer.use(`/api/v${service.apiVersion}/${service.name}/*`, async (req, res, next) => {
      try {
        serviceProxy.web(
          req,
          res,
          {
            target: `${service.uri}${req.originalUrl}`,
          },
          next,
        );
      } catch (error) {
        next(error);
      }
    });
  });

  expressServer.get('/', async (req, res) => {
    res.json({
      message: 'Rebel Hub Gateway is running.',
    });
  });

  return expressServer;
};

export const startServer = (expressApp: Application, port: number) => {
  expressApp.listen(port, () => console.info(`Server listening on port ${port}!`));
};
