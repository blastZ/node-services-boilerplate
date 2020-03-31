import Application from '../typings/app';

const config: Application.ConfigDatastores = {
  default: {
    url: 'mongodb://root:admin123@localhost:27017/test?authSource=admin'
  },
  cache: {
    url: 'redis://127.0.0.1:6379'
  }
};

export = config;
