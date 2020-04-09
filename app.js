const log = require('debug')('app:init');
const Mongo = require('@blastz/nico/lib/utils/mongo');
const mongoose = require('mongoose');

const init = require('./dist');
const config = require('./config');
const datastores = require('./dist/config/datastores');

(async () => {
  const app = await init({
    ...config,
    routerPrefix: '/api/v1'
  });
  const port = config.port || 1314;

  await Mongo.connect(mongoose, datastores.default.url);

  app.listen(port, () => {
    console.log(`App is on ${port}`);
    log(`App is on ${port}`);
  });
})();
