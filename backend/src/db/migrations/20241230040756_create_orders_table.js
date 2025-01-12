exports.up = function (knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id').primary(); // شناسه یکتا
    table.integer('user_id').unsigned().notNullable(); // شناسه مشتری
    table.timestamp('order_date').defaultTo(knex.fn.now()); // زمان ثبت سفارش
    table.specificType('status', 'order_status_enum').notNullable().defaultTo('در انتظار'); // وضعیت سفارش
    table.specificType('payment_method', 'payment_method_enum').notNullable().defaultTo('آنلاین'); // روش پرداخت
    table.timestamp('delivery_date'); // تاریخ و زمان تحویل
    table.specificType('delivery_status', 'delivery_status_enum').defaultTo('زمان‌بندی‌شده'); // وضعیت تحویل
    table.decimal('total_price', 12, 2).defaultTo(0); // جمع کل مبلغ
    table.decimal('tax_amount', 12, 2).defaultTo(0); // مالیات کل
    table.decimal('discount_amount', 12, 2).defaultTo(0); // تخفیف کل
    table.timestamps(true, true); // زمان‌های ایجاد و به‌روزرسانی

    // روابط
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('orders')
    .raw('DROP TYPE IF EXISTS order_status_enum CASCADE')
    .raw('DROP TYPE IF EXISTS payment_method_enum CASCADE')
    .raw('DROP TYPE IF EXISTS delivery_status_enum CASCADE');
};
