exports.up = function (knex) {
  return knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable().index('categories_name_idx');
    table.integer('parent_id').unsigned().nullable();
    table.text('description');
    table.specificType('status', 'category_status_enum').notNullable().defaultTo('فعال');
    table.timestamps(true, true);

    table.foreign('parent_id').references('id').inTable('categories').onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('categories');
};
