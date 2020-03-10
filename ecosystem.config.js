module.exports = {
  apps: [
    {
      name: 'node-services-boilerplate',
      script: './app.js',
      instances: '-1',
      exec_mode: 'cluster',
      max_memory_restart: '512M',
      out_file: './log/out.log',
      error_file: './log/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: 'development',
        APP_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        APP_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: 'xxx.xxx.xxx.xxx',
      ref: 'origin/master',
      repo: 'git@github.com:blastZ/node-services-boilerplate.git',
      path: '/app/node-services-boilerplate',
      'post-deploy': 'npm install && npm run tsc && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
};
