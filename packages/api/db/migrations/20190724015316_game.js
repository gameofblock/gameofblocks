// eslint-disable-next-line func-names
exports.up = async function(knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("game", table => {
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.timestamps(true, true);
    table.datetime("start_date", { precision: 6 }).defaultTo(knex.fn.now(6));
    table.datetime("end_date", { precision: 6 }).defaultTo(knex.fn.now(6));
    table
      .integer("x_size")
      .unique()
      .notNullable();
    table
      .integer("y_size")
      .unique()
      .notNullable();
    table
      .integer("turn_number")
      .unique()
      .notNullable();
    table
      .float("prize")
      .unique()
      .notNullable();
    table
      .float("entry_prize")
      .unique()
      .notNullable();
    table
      .integer("max_players")
      .notNullable()
      .defaultTo(100);
  });
};

// eslint-disable-next-line func-names
exports.down = function(knex) {
  return knex.schema.dropTable("game");
};
