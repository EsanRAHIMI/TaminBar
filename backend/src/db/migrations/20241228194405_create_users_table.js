exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable().index('users_name_idx');
    table.string('email', 255).notNullable().unique().index('users_email_idx');
    table.string('password', 255).notNullable();
    table.string('phone', 20).index('users_phone_idx');
    table.specificType('role', 'user_role_enum').notNullable().defaultTo('مشتری');
    table.string('national_id', 50).index('users_national_id_idx');
    table.text('address');
    table.string('region', 100).index('users_region_idx');
    table.integer('loyalty_points').defaultTo(0);
    table.decimal('account_balance', 12, 2).defaultTo(0);
    table.specificType('status', 'user_status_enum').notNullable().defaultTo('فعال');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
