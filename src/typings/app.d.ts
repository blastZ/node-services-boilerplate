import { Middleware } from 'koa';
import koaBody from 'koa-body';

declare namespace Application {
  interface ConfigRoutes {
    [method_route: string]: {
      controller: Middleware<State, Custom>;
      policies?: Middleware<State, Custom>[] | boolean;
      bodyParser?: boolean | koaBody.IKoaBodyOptions;
    };
  }

  interface Config {
    routes: ConfigRoutes;
    custom: ConfigCustom;
  }
}
