import mongoose from 'mongoose';
import config from '../config';

export class DB {
  static async connect(datastores: any) {
    await mongoose.connect(datastores.default.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false
    });
  }
}
