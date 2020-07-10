"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Table = mongoose.model('Table');
const OrderSchema = new mongoose.Schema({
    tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
    items: [{ type: String, required: [true, "can't be blank"] }],
    open: { type: Boolean, default: true }
}, { timestamps: true });
OrderSchema.methods.addToOrder = function (items) {
    this.items = this.items.concat(items);
    return this.save();
};
mongoose.model('Order', OrderSchema);
