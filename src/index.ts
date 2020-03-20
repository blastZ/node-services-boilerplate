import Koa from 'koa';
import Router from '@koa/router';
import serve from 'koa-static';
import path from 'path';

import { DB } from './utils/db';
import routes from './middleware/routes';
import errorHandler from './middleware/error-handler';
import responses from './middleware/responses';
import defaultConfig from './config';
import customHandler from './middleware/custom-handler';
import cors from './middleware/cors';
import { mergeDeep } from './utils/utility';
import { Application } from './typings/app';

export = async (inputConfig: Partial<Application.Config>) => {
  const config: Application.Config = mergeDeep(defaultConfig, inputConfig);

  const app = new Koa();

  app.use(responses());
  app.use(errorHandler());
  app.use(cors(config));
  app.use(serve(path.resolve(process.cwd(), './assets'), config.serve));
  app.use(customHandler(config));

  const router = new Router<State, Custom>();

  app.use(routes(router, config));
  app.use(router.routes()).use(router.allowedMethods());

  await DB.connect(config.datastores);

  const port = config.port || 1314;
  app.listen(port, () => {
    console.log(`App is on ${port}`);
  });
};
