"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pass = void 0;
const passport = require("passport");
const passportLocal = require("passport-local");
const mongoose = require("mongoose");
const User = mongoose.model('User');
const localStrategy = passportLocal.Strategy;
exports.pass = passport.use(new localStrategy({
    usernameField: 'name',
    passwordField: 'password'
}, function (name, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield User.findOne({ name: name });
            if (!user || !user.validatePassword(password)) {
                return done(null, false, { message: 'email or password is invalid' });
            }
            return done(null, user);
        }
        catch (err) {
            console.log(err);
        }
    });
}));
