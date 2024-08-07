// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    estado: {
        type: String,
        required: true,
        trim: true  
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: String,   // Token para JWT
    recoveryToken: String,  // Token para recuperación de cuenta
    tokenExpiration: Date,  // Fecha y hora de expiración del token de recuperación
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
