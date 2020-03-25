exports.up = knex => {
  return knex.schema.createTable('card', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('attack').notNullable();
    table.string('life').notNullable();
    table.string('defense').notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTable('card');
};
