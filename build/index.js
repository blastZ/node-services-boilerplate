const ncc = require('@zeit/ncc');
const path = require('path');
const fs = require('fs');

const shell = require('shelljs');

const distPath = path.resolve(__dirname, './dist');

shell.rm('-rf', distPath);
shell.mkdir('-p', distPath);

ncc(path.resolve(__dirname, '../app.js'), {
  cache: path.resolve(__dirname, './.cache'),
  externals: [],
  filterAssetBase: process.cwd(),
  minify: true,
  sourceMap: false,
  sourceMapBasePrefix: '../',
  sourceMapRegister: true,
  watch: false,
  v8cache: false,
  quiet: false,
  debugLog: false
}).then(({ code, map, assets }) => {
  fs.writeFileSync(path.resolve(distPath, './app.js'), code);
});
