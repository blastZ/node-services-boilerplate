const bytenode = require('./bytenode');

bytenode.init({ extName: '.robot' });

const start = require('./index.robot');
const config = require('./config');

start(config);
