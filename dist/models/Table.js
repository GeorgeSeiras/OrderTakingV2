"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.TableSchema = void 0;
const mongoose = require("mongoose");
exports.TableSchema = new mongoose.Schema({
    tableId: { type: Number, unique: true, required: [true, "can't be blank"], match: [/^[0-9]/, 'is invalid'], index: true }
});
exports.Table = mongoose.model('Table', exports.TableSchema);
