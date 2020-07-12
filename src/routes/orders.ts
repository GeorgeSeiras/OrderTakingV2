import * as express from 'express';
import * as mongoose from 'mongoose';
import { auth } from '../auth/auth'
import { IPayload } from '../interfaces/requestDefinitions';
import { Table } from '../models/Table';
import { Order } from '../models/Order';
import { User } from '../models/User';

export const orderRouter = express.Router();
orderRouter
    .route('/:tableId')
    .get(async function (req, res) {
        try {
            let table = await Table.findOne({ tableId: req.params.tableId });
            let orders = await Order.find({ tableId: table._id });
            return res.status(200).json({
                orders: orders.map(function (order) {
                    return order;
                }),
                tableId: req.params.tableId
            });
        } catch (err) {
            console.log(err);
        }
    })
    .post(auth.required, async function (req: IPayload, res) {
        let user = await User.findById(req.payload.id);
        if (!user) {
            return res.sendStatus(401);
        }
        try {
            let items: Array<string> = req.body.items;
            if (items.length != 0) {
                let table = await Table.findOne({ tableId: req.params.tableId });
                let order = await new Order({
                    tableId: table._id,
                    items: items.map(function (item) {
                        return item;
                    })
                }).save();
                res.json({ order: order });
            }
        } catch (err) {
            console.log(err);
        }
    })
orderRouter
    .route('/:tableId/:orderId')
    .delete(auth.required, async function (req: IPayload, res) {
        let user = await User.findById(req.payload.id);
        if (!user) {
            return res.sendStatus(401);
        }
        try {
            let order = await Order.findByIdAndUpdate({ _id: req.params.orderId }, { open: false });
            res.json({ order: order });
        } catch (err) {
            console.log(err);
        }
    })
    .get(auth.required,async function (req:IPayload, res) {
        let user = await User.findById(req.payload.id);
        if (!user) {
            return res.sendStatus(401);
        }
        let table = await Table.findOne({ tableId: req.params.tableId });
        let order = await Order.findOne({ tableId: table._id, open: true });
        res.json({ order: order });
    })
    .put(auth.required, async function (req: IPayload, res) {
        let user = await User.findById(req.payload.id);
        if (!user) {
            return res.sendStatus(401);
        }
        try {
            let table = await Table.findOne({ tableId: req.params.tableId });
            let order = await Order.findOne({ tableId: table._id, open: true });
            let newItems: Array<string> = req.body.items
            order.items = order.items.concat(newItems);
            order.save();
            res.json({ order: order });
        } catch (err) {
            console.log(err);
        }
    })