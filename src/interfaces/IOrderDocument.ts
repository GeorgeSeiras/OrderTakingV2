import * as mongoose from 'mongoose';

export interface IOrderDocument extends mongoose.Document{
    tableId:mongoose.Schema.Types.ObjectId;
    items:Array<string>;
    open:boolean;
}