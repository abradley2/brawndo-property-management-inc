module.exports = {
  client: 'postgresql',
  connection: {
    database: 'pure',
    user: 'tonybradley'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
