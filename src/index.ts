import Koa from 'koa';
import Router from '@koa/router';

import { DB } from './utils/db';
import routes from './middleware/routes';
import errorHandler from './middleware/error-handler';
import responses from './middleware/responses';

import defaultConfig from './config';
import customHandler from './middleware/custom-handler';
import cors from './middleware/cors';

export = async (inputConfig: any) => {
  const config = {
    ...defaultConfig,
    ...inputConfig
  };

  const app = new Koa();

  app.use(responses());
  app.use(errorHandler());
  app.use(cors(config));
  app.use(customHandler(config));

  const router = new Router<State, Custom>();

  app.use(routes(router, config));
  app.use(router.routes()).use(router.allowedMethods());

  await DB.connect(config.datastores);

  app.listen(1314, () => {
    console.log('App is on 1314');
  });
};
