"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
    items: [{ type: String, required: [true, "can't be blank"] }],
    open: { type: Boolean, default: true }
}, { timestamps: true });
OrderSchema.methods.addToOrder = function (items) {
    this.items = this.items.concat(items);
    return this.save();
};
exports.Order = mongoose.model('Order', OrderSchema);
