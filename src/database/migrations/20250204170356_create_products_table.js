exports.up = function (knex) {
    return knex.schema.createTable("products", (table) => {
      table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();
      table.string("name").notNullable();
      table.text("description");
      table.string("category");
      table.decimal("old_price", 10, 2).notNullable();
      table.decimal("new_price", 10, 2).notNullable();
      table.string("image_url");
      table.boolean("free_delivery").defaultTo(false);
      table.decimal("delivery_amount", 10, 2);
      table.uuid("vendor_id").references("id").inTable("users").onDelete("CASCADE");
      table.timestamp("start_date").defaultTo(knex.fn.now());
      table.timestamp("expiry_date").defaultTo(knex.raw("CURRENT_TIMESTAMP + INTERVAL '7 days'"));
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("products");
  };
  