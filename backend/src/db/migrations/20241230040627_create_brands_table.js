// backend/src/db/migrations/20241230040627_create_brands_table.js

exports.up = function (knex) {
    return knex.schema.createTable('brands', (table) => {
      table.increments('id').primary(); // شناسه یکتا
      table.string('name', 255).notNullable().index('brands_name_idx'); // نام برند
      table.text('description'); // توضیحات برند
      table.timestamps(true, true); // زمان‌های ایجاد و به‌روزرسانی
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('brands');
  };
  