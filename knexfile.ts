module.exports = {
  client: 'postgresql',
  connection: {
    database: process.env.POSTGRES_DB
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
