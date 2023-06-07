import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('property', (table) => {
    table.increments('id').primary()
    table.string('address').notNullable()
    table.string('city').notNullable()
    table.string('state').notNullable()
    table.string('zip').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('property')
}
