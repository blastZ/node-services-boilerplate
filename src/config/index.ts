import routes from './routes';
import custom from './custom';
import security from './security';
import serve from './serve';
import datastores from './datastores';
import responses from './responses';
import { Config } from '../typings/koa';

const config: Config = {
  routes,
  custom,
  security,
  serve,
  datastores,
  responses
};

export = config;
