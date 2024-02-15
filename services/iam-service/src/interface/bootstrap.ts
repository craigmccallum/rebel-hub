import { type CommandHandlers, type QueryHandlers } from '~/application/bootstrap';
import { createExpressServer, startServer } from './express/server';

export const bootstrapInterface = (
  CommandHandlers: CommandHandlers,
  queryHandlers: QueryHandlers,
  environment: 'development' | 'staging' | 'production',
  serverPort: number,
) => {
  const expressApp = createExpressServer(CommandHandlers, queryHandlers, environment);
  startServer(expressApp, serverPort);
};
