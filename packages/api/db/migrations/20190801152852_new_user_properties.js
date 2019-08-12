exports.up = knex => {
  return knex.schema.alterTable("user", table => {
    table
      .string("email")
      .unique()
      .notNullable();
    table.string("phone").nullable();
  });
};

exports.down = knex => {
  return knex.schema.alterTable("user", table => {
    table.dropColumn("email");
    table.dropColumn("phone");
  });
};
