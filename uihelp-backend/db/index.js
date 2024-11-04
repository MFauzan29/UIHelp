const { Pool } = require('pg');

const pool = new Pool({
  user: 'group7',
  host: 'localhost',
  database: 'uihelp',
  password: 'pg',
  port: 5432,
});

module.exports = pool;