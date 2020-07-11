"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.use('/tables', require('./tables'));
router.use('/tables/orders', require('./orders'));
router.use('/', require('./user'));
module.exports = router;
