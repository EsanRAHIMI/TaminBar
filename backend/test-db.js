const { Pool } = require('pg');

const pool = new Pool({
  host: 'taminbar-db', // یا آدرس IP سرور Dokploy
  port: 5432,
  user: 'simorx',
  password: 'yourpassword',
  database: 'taminbar_db',
});

(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database Connected:', result.rows[0]);
  } catch (error) {
    console.error('Database Connection Error:', error.message);
  } finally {
    pool.end();
  }
})();
