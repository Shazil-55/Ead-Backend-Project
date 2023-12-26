import { Knex } from 'knex';

function up(knex: Knex) {
  return knex.schema.createTable('students', (t) => {
    t.uuid('id').unique().defaultTo(knex.raw('gen_random_uuid()')).primary();
    t.string('name').notNullable();
    t.string('rollNumber').notNullable();
    t.string('gender').notNullable();
    t.string('department').notNullable();
    t.string('degree').notNullable();
    t.date('dob').notNullable();
    t.date('startDate').notNullable();
    t.date('endDate').notNullable();
    t.string('city').notNullable();
    t.string('interest').notNullable();
    t.string('status').notNullable();
    t.timestamp('createdAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
  }).raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON "students"
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
}

function down(knex: Knex) {
  return knex.schema.raw(`
    DROP TABLE "students";
  `);
}

export { up, down };
