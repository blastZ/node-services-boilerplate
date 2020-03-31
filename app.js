const init = require('./dist');
const config = require('./config');
const log = require('debug')('nico:app');

(async () => {
  const app = await init(config);
  const port = config.port || 1314;

  await app.db.connect();

  app.listen(port, () => {
    console.log(`App is on ${port}`);
    log(`App is on ${port}`);
  });
})();
