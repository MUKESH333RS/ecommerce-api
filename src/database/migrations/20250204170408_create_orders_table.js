exports.up = function (knex) {
    return knex.schema.createTable("orders", (table) => {
      table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();
      table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");
      table.uuid("product_id").references("id").inTable("products").onDelete("CASCADE");
      table.integer("quantity").notNullable();
      table.decimal("total_price", 10, 2).notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("orders");
  };
  