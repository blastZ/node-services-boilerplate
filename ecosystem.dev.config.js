module.exports = {
  apps: [
    {
      name: 'node-services-boilerplate',
      script: './app.js',
      exec_mode: 'fork',
      watch: ['./dist'],
      watch_delay: 1000,
      watch_options: {
        followSymlinks: false
      },
      env: {
        NODE_ENV: 'production',
        APP_ENV: 'development'
      }
    }
  ]
};
