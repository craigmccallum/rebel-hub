import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { openApiConfig, zodOpenApiRegistry } from '@rebel-hub/service-tools';
import cookieParser from 'cookie-parser';
// import cors from 'cors';
import express, { type Application, type NextFunction, type Request, type Response } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import type { CommandHandlers, QueryHandlers } from '~/application/bootstrap';
import { setUpIAMRouter } from '~/interface/express/iamServiceRouter';

export const createExpressServer = (
  CommandHandlers: CommandHandlers,
  queryHandlers: QueryHandlers,
  env: 'development' | 'staging' | 'production',
) => {
  const expressApp: Application = express();

  expressApp.use(cookieParser());

  expressApp.use(express.json());

  // const corsWhitelist =
  //   env === 'development' ? ['http://localhost:8000', 'http://localhost:9999'] : [];
  // const corsOptions: cors.CorsOptions = {
  //   origin: function (origin, callback) {
  //     if (origin && corsWhitelist.indexOf(origin) !== -1) {
  //       callback(null, false);
  //     } else {
  //       callback(new Error(`Origin not allowed by CORS: ${origin}`));
  //     }
  //   },
  // };
  // expressApp.use(cors(corsOptions));

  morgan.token('userId', (req) => {
    // return req.authPassport?.userId;
    return '';
  });
  expressApp.use(
    morgan(
      env === 'development'
        ? ':userId :method :url :status :response-time ms - :res[content-length]'
        : ':userId :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms',
      {
        skip: function (req) {
          if (req.originalUrl === '/api/v1/iam/authenticate') {
            return true;
          } else {
            return false;
          }
        },
      },
    ),
  );

  expressApp.use((req: Request, res: Response, next: NextFunction) => {
    req.authPassport =
      req.headers['user-passport'] && JSON.parse(req.headers['user-passport'] as string);
    next();
  });

  // API endpoints
  expressApp.use('/', setUpIAMRouter(CommandHandlers, queryHandlers));

  // Swagger docs
  const generator = new OpenApiGeneratorV3(zodOpenApiRegistry.definitions);
  generator.generateComponents();
  const openAPIDocument = generator.generateDocument(openApiConfig);
  expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openAPIDocument));

  return expressApp;
};

export const startServer = (expressApp: Application, port: number) => {
  expressApp.listen(port, () => console.info(`Server listening on port ${port}!`));
};
