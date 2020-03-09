const config = {
  production: {},
  development: {}
};

const env = process.env.APP_ENV || 'production';

module.exports = config[env];
