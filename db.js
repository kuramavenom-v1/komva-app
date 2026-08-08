const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('خطأ في الاتصال بقاعدة البيانات:', err.stack);
  }
  console.log('تم الاتصال بقاعدة بيانات Supabase بنجاح!');
  release();
});

module.exports = pool;
