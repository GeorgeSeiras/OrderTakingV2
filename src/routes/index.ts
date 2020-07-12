import * as express from "express";
import { tableRouter } from './tables';
import { orderRouter } from './orders';
import { userRouter } from './user';

export const router = express.Router();

router.use('/tables', tableRouter);
router.use('/tables/orders', orderRouter);
router.use('/', userRouter);
