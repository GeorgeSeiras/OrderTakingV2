import * as mongoose from 'mongoose';
import {IOrderDocument} from '../interfaces/IOrderDocument';

const OrderSchema: mongoose.Schema = new mongoose.Schema({
    tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
    items: [{ type: String, required: [true, "can't be blank"] }],
    open:{type:Boolean, default:true}
}, { timestamps: true });

export interface IOrder extends IOrderDocument{
    addToOrder(items:string[]):Promise<this>;
}

export interface IOrderModel extends mongoose.Model<IOrder>{
}

OrderSchema.methods.addToOrder = function(items:string[]){
    this.items = this.items.concat(items)
    return this.save();
};

export const Order:IOrderModel =mongoose.model<IOrder,IOrderModel>('Order',OrderSchema);