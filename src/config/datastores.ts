import { ConfigDatastores } from '../typings/koa';

const config: ConfigDatastores = {
  default: {
    url: 'mongodb://root:admin123@localhost:27017/test?authSource=admin'
  },
  cache: {
    url: 'redis://127.0.0.1:6379'
  }
};

export = config;
