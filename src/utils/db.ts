import mongoose from 'mongoose';
import Redis from 'ioredis';

import Application from '../typings/app';

export class DB {
  redis: Redis.Redis | undefined;
  config: Application.ConfigDatastores = {
    default: {
      url: ''
    }
  };

  constructor(config: Application.ConfigDatastores) {
    this.config = config;
  }

  async connect() {
    if (this.config.default) {
      await mongoose.connect(this.config.default.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
    }

    if (this.config.cache) {
      const redis = new Redis(this.config.cache.url);
      this.redis = redis;
    }
  }

  async disconnect() {
    if (this.config.default) {
      await Promise.all(
        mongoose.connections.map(async connection => {
          await connection.close();
        })
      );
    }

    if (this.redis) {
      this.redis.disconnect();
    }
  }
}
