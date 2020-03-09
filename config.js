const config = {
  production: {},
  development: {}
};

const env = process.env.APP_ENV;

module.exports = config[env];
