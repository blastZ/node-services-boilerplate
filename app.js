const log = require('@blastz/nico').log;

const init = require('./dist');
const config = require('./config');

(async () => {
  const app = await init(config);
  const port = config.port || 1314;

  app.listen(port, () => {
    console.log(`App is on ${port}`);
    log.extend('app')(`app is on ${port}`);
  });
})();
