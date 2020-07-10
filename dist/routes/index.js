"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.use('/', require('./tables'));
router.use('/tables', require('./orders'));
module.exports = router;
