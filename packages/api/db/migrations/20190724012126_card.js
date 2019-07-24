// eslint-disable-next-line func-names
exports.up = async function(knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.createTable("card", table => {
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .string("name")
      .unique()
      .notNullable();
    table
      .string("string")
      .unique()
      .notNullable();
    table
      .string("description")
      .unique()
      .notNullable();
    table
      .integer("attack")
      .unique()
      .notNullable();
    table
      .integer("defense")
      .unique()
      .notNullable();
    table
      .integer("action_point")
      .unique()
      .notNullable();

    table.jsonb("attributes").nullable();
    table.boolean("purchasable").default(false);
    table.string("eth_address").nullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable("user_card", table => {
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .uuid("card_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("card");
    table
      .uuid("user_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");
  });
};

// eslint-disable-next-line func-names
exports.down = async knex => {
  await knex.schema.dropTable("user_card");
  await knex.schema.dropTable("card");
};
