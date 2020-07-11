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
const express = require("express");
const User_1 = require("../models/User");
const passport_1 = require("../auth/passport");
const router = express.Router();
router
    .route('/login')
    .post(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.name) {
                return res.status(422).json({ message: { name: "can't be blank" } });
            }
            if (!req.body.password) {
                return res.status(422).json({ message: { password: "can't be blank" } });
            }
            passport_1.pass.authenticate('local', { session: false }, function (err, user, info) {
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
                }
                else {
                    return res.status(422).json(info);
                }
            })(req, res, next);
        }
        catch (err) {
            console.log(err);
            next();
        }
    });
});
router
    .route('/register')
    .post(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.name) {
            return res.status(422).json({ message: { name: "can't be blank" } });
        }
        if (!req.body.password) {
            return res.status(422).json({ message: { password: "can't be blank" } });
        }
        if (!req.body.type) {
            return res.status(422).json({ message: { type: "can't be blank" } });
        }
        let user = new User_1.User();
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
        });
    });
});
module.exports = router;
