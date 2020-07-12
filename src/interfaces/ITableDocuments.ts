import { Document } from 'mongoose';

export interface ITableDocument extends Document{
    tableId:string;
}