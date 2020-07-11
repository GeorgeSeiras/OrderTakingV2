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
const mongoose = require("mongoose");
const auth_1 = require("../auth/auth");
const Order = mongoose.model('Order');
const Table = mongoose.model('Table');
const User = mongoose.model('User');
const router = express.Router();
router
    .route('/')
    .get(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let tables = yield Table.find({});
            if (!tables) {
                return res.status(204).json("No tables found");
            }
            return res.json({ tables: tables });
        }
        catch (err) {
            console.log(err);
            next();
        }
    });
})
    .post(auth_1.auth.required, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield User.findById(req.payload.id);
        if (!user) {
            return res.sendStatus(401);
        }
        try {
            let tableCount = req.body.count;
            let existingTableCount = yield Table.find({}).count();
            let tablesList = [];
            for (let i = 0; i < tableCount; i++) {
                new Table({
                    tableId: (existingTableCount + 1 + i)
                }).save();
                tablesList.push(existingTableCount + 1 + i);
            }
            return res.json({
                tables: tablesList.map(function (table) {
                    return table;
                })
            });
        }
        catch (err) {
            console.log(err);
            next();
        }
    });
})
    .delete(auth_1.auth.required, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield User.findById(req.payload.id);
        if (!user) {
            return res.sendStatus(401);
        }
        try {
            let tableCount = Number(req.body.count);
            let tableIds;
            let tablesFound = yield Table.find({}, { _id: 1 })
                .limit(tableCount)
                .sort({ tableId: -1 })
                .map(function (table) { return table; });
            console.log(tablesFound);
            yield Table.remove({ _id: { $in: tablesFound } });
            return res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            next();
        }
    });
});
module.exports = router;
