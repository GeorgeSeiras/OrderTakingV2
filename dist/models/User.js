"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const auth_1 = require("../auth/auth");
const UserSchema = new mongoose.Schema({
    name: { type: String, required: [true, "can't be blank"], match: [/^[a-zA-Z]/, 'is invalid'] },
    hash: String,
    salt: String,
    type: { type: String, enum: ['admin', 'employee'] }
}, { timestamps: true });
UserSchema.methods.setPassword = function (passwd) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(passwd, this.salt, 10000, 521, 'sha512').toString('hex');
};
UserSchema.methods.validatePassword = function (passwd) {
    let hash = crypto.pbkdf2Sync(passwd, this.salt, 10000, 521, 'sha512').toString('hex');
    return this.hash === hash;
};
UserSchema.methods.generateJWT = function () {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: exp.getTime() / 1000
    }, auth_1.secret);
};
exports.User = mongoose.model('User', UserSchema);
