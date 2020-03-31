import Application from '../typings/app';

const config: Application.ConfigSecurity = {
  cors: {
    allowOrigins: ['http://localhost', 'http://127.0.0.1', 'http://easyv.test.dtstack.net', 'http://172.16.10.70'],
    allowCredentials: true
  }
};

export = config;
