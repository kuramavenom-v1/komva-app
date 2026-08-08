const { Pool } = require('pg');
require('dotenv').config();

// إنشاء اتصال باستخدام الرابط الموجود في ملف .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // بعض استضافات Supabase بتتطلب إعدادات SSL، أضفها لو ظهرت مشكلة في الاتصال:
  ssl: {
    rejectUnauthorized: false
  }
});

// اختبار الاتصال
pool.connect((err, client, release) => {
  if (err) {
    return console.error('خطأ في الاتصال بقاعدة البيانات:', err.stack);
  }
  console.log('تم الاتصال بقاعدة بيانات Supabase بنجاح!');
  release();
});

module.exports = pool;
