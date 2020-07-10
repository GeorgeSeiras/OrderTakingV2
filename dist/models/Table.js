"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const TableSchema = new mongoose.Schema({
    tableId: { type: Number, unique: true, required: [true, "can't be blank"], match: [/^[0-9]/, 'is invalid'], index: true }
});
mongoose.model('Table', TableSchema);
