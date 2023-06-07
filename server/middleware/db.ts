import knex from 'knex'

const client = knex({
  client: 'postgresql',
  connection: {
    database: 'pure',
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  }
})

export default defineEventHandler(async (event) => {
  event.context.db = client
})
