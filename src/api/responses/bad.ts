import { Context } from 'koa';

export = function(this: Context, message = 'Invalid request params') {
  this.status = 400;
  this.body = {
    success: false,
    message
  };
};
