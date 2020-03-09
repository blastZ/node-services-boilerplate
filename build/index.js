const ncc = require('@zeit/ncc');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

const distPath = path.resolve(__dirname, './dist');

shell.rm('-rf', distPath);
shell.mkdir('-p', distPath);

ncc(path.resolve(__dirname, '../dist/index.js'), {
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
  fs.writeFileSync(path.resolve(distPath, './index.js'), code);
  if (assets) {
    Object.entries(assets).map(([name, { source }]) => {
      const dir = path.dirname(name);
      if (!fs.existsSync(path.resolve(distPath, dir))) {
        shell.mkdir('-p', path.resolve(distPath, dir));
      }

      fs.writeFileSync(path.resolve(distPath, `./${name}`), source);
    });
  }

  shell.cp('-R', path.resolve(__dirname, './template/app.js'), path.resolve(__dirname, './dist'));
  shell.cp('-R', path.resolve(__dirname, './template/config.js'), path.resolve(__dirname, './dist'));
});
