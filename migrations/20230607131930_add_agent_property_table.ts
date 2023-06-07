import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('agent_property', (table) => {
    table.increments('id').primary()
    table.integer('agent_id').unsigned().notNullable()
    table.integer('property_id').unsigned().notNullable()
    table.foreign('agent_id').references('id').inTable('agent')
    table.foreign('property_id').references('id').inTable('property')
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('agent_property')
}
