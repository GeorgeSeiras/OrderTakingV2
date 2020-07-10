import * as mongoose from 'mongoose';
const Table = mongoose.model('Table');

const OrderSchema: mongoose.Schema = new mongoose.Schema({
    tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
    items: [{ type: String, required: [true, "can't be blank"] }],
    open:{type:Boolean, default:true}
}, { timestamps: true });

OrderSchema.methods.addToOrder = function(items:string[]){
    this.items = this.items.concat(items)
    return this.save();
};


mongoose.model('Order',OrderSchema);