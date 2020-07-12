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
exports.orderRouter = void 0;
const express = require("express");
const auth_1 = require("../auth/auth");
const Table_1 = require("../models/Table");
const Order_1 = require("../models/Order");
const User_1 = require("../models/User");
exports.orderRouter = express.Router();
exports.orderRouter
    .route('/:tableId')
    .get(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let table = yield Table_1.Table.findOne({ tableId: req.params.tableId });
            let orders = yield Order_1.Order.find({ tableId: table._id });
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
                let table = yield Table_1.Table.findOne({ tableId: req.params.tableId });
                let order = yield new Order_1.Order({
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
exports.orderRouter
    .route('/:tableId/:orderId')
    .delete(auth_1.auth.required, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield User_1.User.findById(req.payload.id);
        if (!user) {
            return res.sendStatus(401);
        }
        try {
            let order = yield Order_1.Order.findByIdAndUpdate({ _id: req.params.orderId }, { open: false });
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
        let table = yield Table_1.Table.findOne({ tableId: req.params.tableId });
        let order = yield Order_1.Order.findOne({ tableId: table._id, open: true });
        res.json({ order: order });
    });
})
    .put(auth_1.auth.required, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield User_1.User.findById(req.payload.id);
        if (!user) {
            return res.sendStatus(401);
        }
        try {
            let table = yield Table_1.Table.findOne({ tableId: req.params.tableId });
            let order = yield Order_1.Order.findOne({ tableId: table._id, open: true });
            let newItems = req.body.items;
            order.items = order.items.concat(newItems);
            yield order.save();
            res.json({ order: order });
        }
        catch (err) {
            console.log(err);
            next();
        }
    });
});
