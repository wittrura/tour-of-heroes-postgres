const path = require('path');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/tourofheroes_test',
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds')
    }
  },

  development: {
    client: 'pg',
    connection: 'postgres://localhost/tourofheroes_dev',
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds')
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
