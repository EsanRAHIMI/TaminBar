exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable().index('products_name_idx');
    table.integer('brand_id').unsigned().nullable();
    table.integer('category_id').unsigned().nullable();
    table.integer('supplier_id').unsigned().nullable();
    table.text('description');
    table.decimal('price', 12, 2).notNullable().defaultTo(0);
    table.integer('stock').notNullable().defaultTo(0);
    table.specificType('unit', 'product_unit_enum').notNullable().defaultTo('عدد');
    table.date('expiration_date');
    table.decimal('weight', 8, 2).defaultTo(0);
    table.string('packaging_type', 100);
    table.decimal('tax_rate', 5, 2).defaultTo(0);
    table.decimal('discount', 5, 2).defaultTo(0);
    table.specificType('status', 'product_status_enum').notNullable().defaultTo('فعال');
    table.timestamps(true, true);

    table.foreign('brand_id').references('id').inTable('brands').onDelete('SET NULL');
    table.foreign('category_id').references('id').inTable('categories').onDelete('SET NULL');
    table.foreign('supplier_id').references('id').inTable('suppliers').onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products');
};
