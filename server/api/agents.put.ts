import { setResponseHeader, setResponseStatus, send } from 'h3'
import type { Knex } from 'knex'
import * as T from 'io-ts'

const RequestDecoder = T.type({
  id: T.union([T.number, T.undefined]),
  first_name: T.string,
  last_name: T.string,
  email: T.string,
  mobile_number: T.string
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

  let existing = null
  if (typeof request.id !== 'undefined') {
    existing = await dbClient.table('agent').first('*').where('id', requestBody.id)
  }

  if (existing !== null) {
    const updateResult = await dbClient.table('agent').update(requestBody).where('id', requestBody.id)

    setResponseHeader(event, 'Content-Type', 'application/json')
    setResponseStatus(event, 200)
    await send(event, JSON.stringify(updateResult))

    return
  }

  const insertResult = await dbClient.table('agent').insert(requestBody)

  setResponseHeader(event, 'Content-Type', 'application/json')
  setResponseStatus(event, 200)
  await send(event, JSON.stringify(insertResult))
})
