require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

// 1. تعريف تطبيق Express أولاً (قبل أي استخدام لـ app)
const app = express();

// 2. إعدادات الـ Middleware
app.use(express.json());
app.use(cors());

// 3. ربط المسارات (Routes)
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('Komva Backend is running with Supabase...');
});

// 4. تشغيل الخادم (السيرفر)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
