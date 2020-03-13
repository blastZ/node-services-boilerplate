import Router from '@koa/router';
import KoaBody from 'koa-body';
import { ParameterizedContext, Next, Middleware } from 'koa';

import { Application } from '../../typings/app';

export = (router: Router<State, Custom>, config: any) => {
  const { routes: routerMap }: { routes: Application.ConfigRoutes } = config;

  router.prefix('/api/v1');

  Object.entries(routerMap).map(([key, value]) => {
    const { controller, policies = true, bodyParser = false } = value;
    const [methodStr, route] = key.split(' ');
    const method = methodStr.toLowerCase();
    const testMethod = /^(get|post|delete|put|patch)$/;

    if (!testMethod.test(method)) {
      console.error('E_CONFIG_ROUTES_INVALID_ROUTE: ', key);
      return;
    }

    let middlewares: Middleware<State, Custom>[] = [];
    if (typeof policies === 'boolean') {
      if (!policies) {
        middlewares.push((ctx: ParameterizedContext<State, Custom>, next: Next) => {
          return ctx.bad('Route is disabled');
        });
      }
    } else if (Array.isArray(policies)) {
      middlewares = [...policies];
    }

    if (bodyParser) {
      if (typeof bodyParser === 'boolean') {
        middlewares.push(KoaBody());
      } else {
        middlewares.push(KoaBody({ ...bodyParser }));
      }
    }

    router[method as HttpMethod](route, ...middlewares, controller);
  });

  return async (ctx: ParameterizedContext<State, Custom>, next: Next) => {
    await next();
  };
};
