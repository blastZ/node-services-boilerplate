import { ParameterizedContext, Next } from 'koa';

import { DB } from '../../utils/db';
import Application from '../../typings/app';
import Custom from '../../typings/context.custom';

export = (app: Application, config: Application.ConfigDatastores) => {
  const db = new DB(config);
  app.db = db;

  return async (ctx: ParameterizedContext<State, Custom>, next: Next) => {
    if (db.redis) {
      ctx.redis = db.redis;
    }

    await next();
  };
};
