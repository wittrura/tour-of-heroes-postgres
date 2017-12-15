
exports.up = function(knex, Promise) {
  return knex.schema.createTable('heroes', (table) => {
    table.increments();
    table.text('name').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('heroes');
};
