const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. تسجيل حساب جديد (Signup)
router.post('/signup', async (req, res) => {
    try {
        const { name, username, phoneOrEmail, password } = req.body;

        // التحقق مما إذا كان المستخدم موجود مسبقاً
        const existingUser = await User.findOne({ $or: [{ username }, { phoneOrEmail }] });
        if (existingUser) {
            return res.status(400).json({ error: 'اسم المستخدم أو البريد/الجوال مستخدم مسبقاً' });
        }

        // تشفير كلمة المرور
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // إنشاء المستخدم الجديد
        const newUser = new User({
            name,
            username,
            phoneOrEmail,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'تم إنشاء الحساب بنجاح' });
    } catch (err) {
        res.status(500).json({ error: 'حدث خطأ في الخادم أثناء التسجيل' });
    }
});

// 2. تسجيل الدخول (Login)
router.post('/login', async (req, res) => {
    try {
        const { phoneOrEmail, password } = req.body;

        // البحث عن المستخدم بواسطة الجوال أو الإيميل أو اسم المستخدم
        const user = await User.findOne({ 
            $or: [{ phoneOrEmail }, { username: phoneOrEmail }] 
        });
        
        if (!user) {
            return res.status(400).json({ error: 'بيانات الدخول غير صحيحة' });
        }

        // التحقق من كلمة المرور
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'بيانات الدخول غير صحيحة' });
        }

        // إنشاء رمز توثيق (JWT Token)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                phoneOrEmail: user.phoneOrEmail,
                bio: user.bio,
                avatar: user.avatar
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'حدث خطأ في الخادم أثناء تسجيل الدخول' });
    }
});

module.exports = router;
