import knex from 'knex'

const client = knex({
  client: 'postgresql',
  connection: {
    database: 'pure'
  }
})

export default defineEventHandler(async (event) => {
  event.context.db = client
})
