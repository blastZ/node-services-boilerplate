import serve from 'koa-static';

export = {
  maxAge: 1 * 24 * 3600 * 1000
} as serve.Options;
