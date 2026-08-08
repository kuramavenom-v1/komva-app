const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    phoneOrEmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: 'Devil\'s Warth — Be the leader, not the follower...' },
    avatar: { type: String, default: 'https://i.pravatar.cc/150?img=8' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
