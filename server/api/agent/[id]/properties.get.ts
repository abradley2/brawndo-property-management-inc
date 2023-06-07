import { setResponseHeader, setResponseStatus, send } from 'h3'
import type { Knex } from 'knex'

export default defineEventHandler(async (event) => {
  const dbClient = event.context.db as Knex

  const agentProperties = await dbClient('agent')
    .select('*')
    .rightJoin('agent_property', 'agent.id', 'agent_property.agent_id')
    .rightJoin('property', 'agent_property.property_id', 'property.id')

  setResponseHeader(event, 'Content-Type', 'application/json')
  setResponseStatus(event, 200)
  await send(event, JSON.stringify(agentProperties))
})
