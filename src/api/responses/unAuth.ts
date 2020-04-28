import { Context } from '@blastz/nico-utility/joi';

export = function (this: Context, message?: string) {
  this.status = 401;
  this.body = {
    success: false,
    message: 'Unauthorized' || message
  };
};
