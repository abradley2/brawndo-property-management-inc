import { setResponseHeader, setResponseStatus, send } from 'h3'
import type { Knex } from 'knex'

export default defineEventHandler(async (event) => {
  const dbClient = event.context.db as Knex

  const agents = await dbClient('agent').select('*')

  setResponseHeader(event, 'Content-Type', 'application/json')
  setResponseStatus(event, 200)
  await send(event, JSON.stringify(agents))
})
