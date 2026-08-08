const router = require('express').Router();
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');

// وسيط (Middleware) للتحقق من هوية المستخدم عبر الـ Token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'غير مصرح لك، يجيب تسجيل الدخول' });

    const token = authHeader.split(' ')[1];
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({ error: 'الرمز (Token) غير صالح' });
    }
};

// 1. إرسال رسالة جديدة
router.post('/send', verifyToken, async (req, res) => {
    try {
        const { receiverId, text } = req.body;
        const senderId = req.user.id;

        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            text
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: 'حدث خطأ أثناء إرسال الرسالة' });
    }
});

// 2. جلب المحادثة بين المستخدم الحالي ومستخدم آخر
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const myId = req.user.id;
        const otherUserId = req.params.userId;

        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: otherUserId },
                { sender: otherUserId, receiver: myId }
            ]
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'حدث خطأ أثناء جلب الرسائل' });
    }
});

module.exports = router;
