import { Middleware } from 'koa';
import koaBody from 'koa-body';
import serve from 'koa-static';
import Joi from '@hapi/joi';

declare namespace Application {
  interface ConfigDatastores {
    default: {
      url: string;
    };
    cache?: {
      url: string;
    };
  }

  interface ConfigRoutes {
    [method_route: string]: {
      controller: Middleware<State, Custom>;
      policies?: Middleware<State, Custom>[] | boolean;
      bodyParser?: boolean | koaBody.IKoaBodyOptions;
      validate?: {
        params?: Joi.ObjectSchema;
        query?: Joi.ObjectSchema;
        body?: Joi.ObjectSchema;
      };
    };
  }

  interface ConfigSecurity {
    cors: {
      allowOrigins: string[];
      allowCredentials?: boolean;
    };
  }

  interface Config {
    datastores: ConfigDatastores;
    routes: ConfigRoutes;
    custom: ConfigCustom;
    security: ConfigSecurity;
    serve: serve.Options;
    port?: number;
  }
}
