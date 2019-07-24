// eslint-disable-next-line func-names
exports.up = async function(knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("block", table => {
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .uuid("user_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");
    table
      .uuid("game_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("game");
    table
      .uuid("card_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("card");
    table
      .integer("attack")
      .unique()
      .notNullable();
    table
      .integer("defense")
      .unique()
      .notNullable();
    table
      .integer("x_position")
      .unique()
      .notNullable();
    table
      .integer("y_position")
      .unique()
      .notNullable();
  });
};

// eslint-disable-next-line func-names
exports.down = function(knex) {
  return knex.schema.dropTable("block");
};
