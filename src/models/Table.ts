import * as mongoose from 'mongoose';
import {ITableDocument} from '../interfaces/ITableDocuments';
export const TableSchema: mongoose.Schema = new mongoose.Schema({
    tableId: { type: Number, unique: true, required: [true, "can't be blank"], match: [/^[0-9]/, 'is invalid'], index: true }
});
export interface ITable extends ITableDocument{

}
export interface ITableModel extends mongoose.Model<ITable>{

}

export const Table:ITableModel= mongoose.model<ITable,ITableModel>('Table',TableSchema);