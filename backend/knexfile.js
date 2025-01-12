require('dotenv').config(); // برای استفاده از فایل .env

const sharedConfig = {
  client: 'pg',
  migrations: {
    directory: './src/db/migrations',
    tableName: 'knex_migrations'
  }
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    }
  },
  production: {
    ...sharedConfig,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    }
  }
};