import * as express from 'express';
import * as mongoose from 'mongoose';
const Order = mongoose.model('Order');
const Table = mongoose.model('Table');
const router = express.Router();

router
    .route('/')
    .get(async function (req, res, next) {
        try {
            let tables = await Table.find({});
            if (!tables) {
                return res.status(204).json("No tables found");
            }
            return res.json({ tables: tables });
        } catch (err) {
            console.log(err);
            next();
        }
    })
    .post(async function (req, res, next) {
        try {
            let tableCount: number = req.body.count;
            let existingTableCount: number = await Table.find({}).count();
            let tablesList: Array<number> = [];
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
        } catch (err) {
            console.log(err);
            next();
        }

    })
    .delete(async function (req, res, next) {
        try {
            let tableCount = Number(req.body.count);
            let tableIds: Array<number>;
            let tablesFound = await Table.find({}, { _id: 1 })
                .limit(tableCount)
                .sort({ tableId: -1 })
                .map(function (table) { return table; });
            console.log(tablesFound);
            await Table.remove({ _id: { $in: tablesFound } });
            return res.sendStatus(200);
        } catch (err) {
            console.log(err);
            next();
        }
    })

module.exports = router;