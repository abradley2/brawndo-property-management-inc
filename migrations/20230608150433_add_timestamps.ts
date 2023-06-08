import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.alterTable('person', (table) => {
    table.timestamps(true, true)
  })

  await knex.schema.alterTable('relation_type', (table) => {
    table.timestamps(true, true)
  })

  await knex.schema.alterTable('person_relation', (table) => {
    table.timestamps(true, true)
  })

  await knex.schema.alterTable('tenant', (table) => {
    table.timestamps(true, true)
  })

  await knex.schema.alterTable('agent', (table) => {
    table.timestamps(true, true)
  })

  await knex.schema.alterTable('agent_property', (table) => {
    table.timestamps(true, true)
  })

  await knex.schema.alterTable('property', (table) => {
    table.timestamps(true, true)
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.alterTable('person', (table) => {
    table.dropTimestamps()
  })

  await knex.schema.alterTable('relation_type', (table) => {
    table.dropTimestamps()
  })

  await knex.schema.alterTable('person_relation', (table) => {
    table.dropTimestamps()
  })

  await knex.schema.alterTable('tenant', (table) => {
    table.dropTimestamps()
  })

  await knex.schema.alterTable('agent', (table) => {
    table.dropTimestamps()
  })

  await knex.schema.alterTable('agent_property', (table) => {
    table.dropTimestamps()
  })

  await knex.schema.alterTable('property', (table) => {
    table.dropTimestamps()
  })
}
