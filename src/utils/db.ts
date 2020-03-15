import mongoose from 'mongoose';
import Redis from 'ioredis';

import { Application } from '../typings/app';

export class DB {
  static async connect(datastores: Application.ConfigDatastores) {
    if (datastores.default) {
      await mongoose.connect(datastores.default.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false
      });
    }

    if (datastores.cache) {
      const redis = new Redis(datastores.cache.url);

      global.redis = redis;
    }
  }
}
