module.exports = {
  apps: [
    {
      script: 'app.js',
      exec_mode: 'fork',
      watch: ['./dist'],
      watch_delay: 1000,
      watch_options: {
        followSymlinks: false
      }
    }
  ]
};
