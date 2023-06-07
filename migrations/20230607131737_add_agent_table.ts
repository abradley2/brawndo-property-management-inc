import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('agent', (table) => {
    table.increments('id').primary()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('email').notNullable()
    table.string('mobile_number').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('agent')
}
