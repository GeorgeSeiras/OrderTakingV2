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
const Table = mongoose.model('Table');
const Order = mongoose.model('Order');
const User_1 = require("../models/User");
const router = express.Router();
router
    .route('/:tableId')
    .get(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let table = yield Table.findOne({ tableId: req.params.tableId });
            let orders = yield Order.find({ tableId: table._id });
            return res.status(200).json({
                orders: orders.map(function (order) {
                    return order;
                }),
                tableId: req.params.tableId
            });
        }
        catch (err) {
            console.log(err);
            next();
        }
    });
})
    .post(auth_1.auth.required, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield User_1.User.findById(req.payload.id);
        if (!user) {
            return res.sendStatus(401);
        }
        try {
            let items = req.body.items;
            if (items.length != 0) {
                let table = yield Table.findOne({ tableId: req.params.tableId });
                let order = yield new Order({
                    tableId: table._id,
                    items: items.map(function (item) {
                        return item;
                    })
                }).save();
                res.json({ order: order });
            }
        }
        catch (err) {
            console.log(err);
            next();
        }
    });
});
router
    .route('/:tableId/:orderId')
    .delete(auth_1.auth.required, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield User_1.User.findById(req.payload.id);
        if (!user) {
            return res.sendStatus(401);
        }
        try {
            let table = yield Table.findOne({ tableId: req.params.tableId });
            let order = yield Order.findByIdAndUpdate({ _id: req.params.orderId }, { open: false });
            res.json({ order: order });
        }
        catch (err) {
            console.log(err);
            next();
        }
    });
})
    .get(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let table = yield Table.findOne({ tableId: req.params.tableId });
        let order = yield Order.findOne({ tableId: table._id, open: true });
        res.json({ order: order });
    });
});
module.exports = router;
