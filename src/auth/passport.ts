import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as mongoose from 'mongoose';
const User = mongoose.model('User');
const localStrategy = passportLocal.Strategy;

export const pass = passport.use(new localStrategy({
    usernameField: 'name',
    passwordField: 'password'
    
}, async function (name, password, done) {
    try {
        let user: any = await User.findOne({ name: name });
        if (!user || ! user.validatePassword(password)) {
            return done(null, false, { message: 'email or password is invalid' });
        }
        return done(null, user);
    } catch (err) {
        console.log(err);
    }
}));