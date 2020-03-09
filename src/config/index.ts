import datastores from './datastores';
import routes from './routes';
import custom from './custom';
import security from './security';
import { Application } from '../typings/app';

const config: Application.Config = {
  datastores,
  routes,
  custom,
  security
};

export = config;
