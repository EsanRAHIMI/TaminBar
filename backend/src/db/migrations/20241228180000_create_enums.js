const enums = require('../enums');

exports.up = async function (knex) {
  for (const enumDef of enums) {
    const enumValues = enumDef.values.map((v) => `'${v}'`).join(', ');
    await knex.raw(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type WHERE typname = '${enumDef.name}'
        ) THEN
          CREATE TYPE ${enumDef.name} AS ENUM (${enumValues});
        END IF;
      END$$;
    `);
  }
};

exports.down = async function (knex) {
  for (const enumDef of enums) {
    await knex.raw(`DROP TYPE IF EXISTS ${enumDef.name} CASCADE;`);
  }
};
