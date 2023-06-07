import { setResponseHeader, setResponseStatus, send } from 'h3'
import type { Knex } from 'knex'

export default defineEventHandler(async (event) => {
  const dbClient = event.context.db as Knex

  const agentPropertyId = getRouterParam(event, 'id')

  const deleteResult = await dbClient.table('agent_property')
    .delete()
    .where('id', agentPropertyId)

  setResponseHeader(event, 'Content-Type', 'application/json')
  setResponseStatus(event, 200)
  await send(event, JSON.stringify(deleteResult))
})
