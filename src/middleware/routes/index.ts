import Router from '@koa/router';
import KoaBody from 'koa-body';
import { ParameterizedContext, Next, Middleware } from 'koa';

import { Application } from '../../typings/app';

export = (router: Router<State, Custom>, config: any) => {
  const { routes: routerMap }: { routes: Application.ConfigRoutes } = config;

  router.prefix('/api/v1');

  Object.entries(routerMap).map(([key, value]) => {
    const { controller, policies = true, bodyParser = false, validate = {} } = value;
    const [methodStr, ...route] = key.split(' ');
    const method = methodStr.toLowerCase();
    const testMethod = /^(get|post|delete|put|patch)$/;

    if (!testMethod.test(method)) {
      console.error('E_ROUTES_INVALID_HTTP_METHOD: ', key);
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

    Object.keys(validate).map(key => {
      const middleware = async (ctx: ParameterizedContext<State, Custom>, next: Next) => {
        let value = {};
        if (key === 'params') {
          value = await validate[key]?.validateAsync(ctx.params);
          ctx.state.params = value;
        } else if (key === 'query' || key === 'body') {
          value = await validate[key]?.validateAsync(ctx.request[key]);
          ctx.state[key] = value;
        }

        await next();
      };

      middlewares.push(middleware);
    });

    router[method as HttpMethod](route, ...middlewares, controller);
  });

  return async (ctx: ParameterizedContext<State, Custom>, next: Next) => {
    await next();
  };
};
