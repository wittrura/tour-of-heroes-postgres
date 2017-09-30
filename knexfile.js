module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost/tourofheroes_text'
  },

  development: {
    client: 'pg',
    connection: 'postgres://localhost/tourofheroes'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
