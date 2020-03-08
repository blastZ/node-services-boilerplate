module.exports = {
  apps: [
    {
      name: 'node-app',
      script: 'app.js',
      instances: '-1',
      exec_mode: 'cluster',
      max_memory_restart: '512M',
      out_file: './log/out.log',
      error_file: './log/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: 'xxx.xxx.xxx.xxx',
      ref: 'origin/master',
      repo: 'ssh://git@git.dtstack.cn:10022/visdev/easyv-node.git',
      path: '/app/node-app',
      'post-deploy': 'npm install && npm run tsc && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
};
