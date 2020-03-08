import { Context } from 'koa';

export = function(this: Context, message?: string) {
  this.status = 401;
  this.body = {
    success: false,
    message: 'Unauthorized' || message
  };
};
