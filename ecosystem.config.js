module.exports = {
    apps: [
      {
        name: 'educraft',
        script: 'npm',
        args: 'start',
        cwd: './', 
        watch: false,
        env: {
          PORT: 5000,
          NODE_ENV: 'production',
        },
        instances: 1, 
        autorestart: true,
        max_memory_restart: '1G',
      },
    ],
  };