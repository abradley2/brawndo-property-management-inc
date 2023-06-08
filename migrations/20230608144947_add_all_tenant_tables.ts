import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('person', (table) => {
    table.increments('id').primary()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
  })

  await knex.schema.createTable('relation_type', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
  })

  await knex.schema.createTable('person_relation', (table) => {
    table.increments('id').primary()
    table.integer('left_person_id').unsigned().notNullable()
    table.integer('right_person_id').unsigned().notNullable()
    table.integer('ltr_relation_id').unsigned().notNullable()

    table.foreign('left_person_id').references('id').inTable('person')
    table.foreign('right_person_id').references('id').inTable('person')
    table.foreign('ltr_relation_id').references('id').inTable('relation_type')
  })

  await knex.schema.createTable('tenant', (table) => {
    table.increments('id').primary()
    table.boolean('primary').notNullable()
    table.integer('person_id').unsigned().notNullable()
    table.integer('property_id').unsigned().notNullable()

    table.foreign('person_id').references('id').inTable('person')
    table.foreign('person_id').references('id').inTable('person')
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('tenant')
  await knex.schema.dropTable('person_relation')
  await knex.schema.dropTable('relation_type')
  await knex.schema.dropTable('person')
}
