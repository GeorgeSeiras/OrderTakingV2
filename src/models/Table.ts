import * as mongoose from 'mongoose';

const TableSchema: mongoose.Schema = new mongoose.Schema({
    tableId: { type: Number, unique: true, required: [true, "can't be blank"], match: [/^[0-9]/, 'is invalid'], index: true }
});

mongoose.model('Table',TableSchema);