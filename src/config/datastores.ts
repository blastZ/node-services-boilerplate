import { Application } from '../typings/app';

export = {
  default: {
    url: 'mongodb://root:admin123@localhost:27017/test?authSource=admin'
  }
} as Application.ConfigDatastores;
