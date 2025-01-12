exports.up = function (knex) {
    return knex.schema.createTable('suppliers', (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable().index('suppliers_name_idx');
      table.string('contact_person', 255).index('suppliers_contact_person_idx');
      table.string('phone', 20).index('suppliers_phone_idx');
      table.string('email', 255).index('suppliers_email_idx');
      table.text('address');
      table.string('region', 100).index('suppliers_region_idx');
      table.timestamps(true, true);
    });
  };
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('suppliers');
  };
  