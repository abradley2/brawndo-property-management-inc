import { setResponseHeader, setResponseStatus, send } from 'h3'
import type { Knex } from 'knex'
import * as T from 'io-ts'

const RequestDecoder = T.type({
  agent_id: T.number,
  property_id: T.number
})

export default defineEventHandler(async (event) => {
  const dbClient = event.context.db as Knex

  const requestBody = await readBody(event)
  let request = null
  const decoded = RequestDecoder.decode(requestBody)

  if (decoded._tag === 'Right') {
    request = decoded.right
  } else {
    setResponseHeader(event, 'Content-Type', 'application/json')
    setResponseStatus(event, 400)
    await send(event, JSON.stringify(decoded.left))
    return
  }

  const agentProperties = await dbClient('agent_property').insert(request)

  setResponseHeader(event, 'Content-Type', 'application/json')
  setResponseStatus(event, 200)
  await send(event, JSON.stringify(agentProperties))
})
