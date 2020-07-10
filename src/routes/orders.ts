import * as express from 'express';
import * as mongoose from 'mongoose';

const Table = mongoose.model('Table');
const Order = mongoose.model('Order');

const router = express.Router();
router
    .route('/:tableId')
    .get(async function (req, res, next) {
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
            next();
        }
    })
    .post(async function (req, res, next) {
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
            next();
        }
    })
router
    .route('/:tableId/:orderId')
    .delete(async function (req, res, next) {
        try {
            let table = await Table.findOne({ tableId: req.params.tableId });
            let order = await Order.findByIdAndUpdate({ _id: req.params.orderId }, { open: false });
            res.json({ order: order });
        } catch (err) {
            console.log(err);
            next();
        }
    })


module.exports = router;