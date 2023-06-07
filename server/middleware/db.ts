import knex from 'knex'

const client = knex({
  client: 'postgresql',
  connection: {
    database: process.env.POSTGRES_DB
  }
})

export default defineEventHandler(async (event) => {
  event.context.db = client
})
