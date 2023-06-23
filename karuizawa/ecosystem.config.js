module.exports = {
    apps: [
      {
        name: 'karuizawa-server',
        script: 'ts-node app.ts',
        watch: true,
        ignore_watch: ['node_modules'],
        watch_delay: 1000,
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  