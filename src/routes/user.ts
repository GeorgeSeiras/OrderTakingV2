import * as express from 'express';
import { User } from '../models/User';
import * as auth from '../auth/auth';
import * as passport from 'passport';
import * as mongoose from 'mongoose';
import { pass } from '../auth/passport'
export const userRouter = express.Router();

userRouter
    .route('/login')
    .post(async function (req, res, next) {
        try {
            if (!req.body.name) {
                return res.status(422).json({ message: { name: "can't be blank" } });
            }
            if (!req.body.password) {
                return res.status(422).json({ message: { password: "can't be blank" } });
            }
            pass.authenticate('local', { session: false }, function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (user) {
                    return res.json({
                        user: {
                            name: user.name,
                            type: user.type,
                            token: user.generateJWT()
                        }
                    });
                } else {
                    return res.status(422).json(info);
                }
            })(req, res, next)
        } catch (err) {
            console.log(err);
            next();
        }
    })
userRouter
    .route('/register')
    .post(async function (req, res, next) {
        if (!req.body.name) {
            return res.status(422).json({ message: { name: "can't be blank" } });
        }
        if (!req.body.password) {
            return res.status(422).json({ message: { password: "can't be blank" } });
        }
        if (!req.body.type) {
            return res.status(422).json({ message: { type: "can't be blank" } });
        }
        let user = new User();

        user.name = req.body.name;
        user.setPassword(req.body.password);
        user.type = req.body.type;
        user.save();
        return res.json({
            user: {
                name: user.name,
                type: user.type,
                token: user.generateJWT()
            }
        })
    })