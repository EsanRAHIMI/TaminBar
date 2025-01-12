exports.up = function (knex) {
  return knex.schema.createTable('order_items', (table) => {
    table.increments('id').primary(); // شناسه یکتا
    table.integer('order_id').unsigned().notNullable(); // شناسه سفارش
    table.integer('product_id').unsigned().notNullable(); // شناسه محصول
    table.integer('quantity').notNullable().defaultTo(1); // تعداد محصول
    table.decimal('unit_price', 12, 2).notNullable().defaultTo(0); // قیمت واحد
    table.specificType('unit', 'orderitem_unit_enum').notNullable().defaultTo('عدد'); // واحد اندازه‌گیری
    table.decimal('tax_rate', 5, 2).defaultTo(0); // نرخ مالیات
    table.decimal('total_price', 12, 2).defaultTo(0); // قیمت کل (quantity * unit_price)
    table.timestamps(true, true); // زمان‌های ایجاد و به‌روزرسانی

    // روابط
    table.foreign('order_id').references('id').inTable('orders').onDelete('CASCADE');
    table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('order_items')
    .raw('DROP TYPE IF EXISTS orderitem_unit_enum CASCADE');
};
