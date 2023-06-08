import { setResponseHeader, setResponseStatus, send } from 'h3'
import type { Knex } from 'knex'

export default defineEventHandler(async (event) => {
  const dbClient = event.context.db as Knex

  const agentId = getRouterParam(event, 'id')

  const agent = await dbClient('agent')
    .select('*')
    .where('id', agentId)
    .first()

  setResponseHeader(event, 'Content-Type', 'application/json')
  setResponseStatus(event, 200)
  await send(event, JSON.stringify(agent))
})
