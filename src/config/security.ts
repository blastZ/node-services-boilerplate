import { ConfigSecurity } from '@blastz/nico/typings';

const config: ConfigSecurity = {
  cors: {
    allowOrigins: ['http://localhost', 'http://127.0.0.1', 'http://easyv.test.dtstack.net', 'http://172.16.10.70'],
    allowCredentials: true
  }
};

export = config;
