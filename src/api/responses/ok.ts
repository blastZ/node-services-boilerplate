import { Context } from 'koa';

export = function ok(this: Context, data?: any, message?: string, success = true) {
  this.body = {
    success,
    data,
    message
  };
};
