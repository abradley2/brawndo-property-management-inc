import { setResponseHeader, setResponseStatus, send } from 'h3'
import type { Knex } from 'knex'

export default defineEventHandler(async (event) => {
  const dbClient = event.context.db as Knex

  const agentId = getRouterParam(event, 'id')

  const tx = await dbClient.transaction()

  await tx.table('agent_property')
    .delete()
    .where('agent_id', agentId)

  const deleteResult = await tx.table('agent')
    .delete()
    .where('id', agentId)

  await tx.commit()

  setResponseHeader(event, 'Content-Type', 'application/json')
  setResponseStatus(event, 200)
  await send(event, JSON.stringify(deleteResult))
})
