import { Context } from '@blastz/nico-utility/joi';

export = function (this: Context, message = 'Invalid request params') {
  this.status = 400;
  this.body = {
    success: false,
    message
  };
};
