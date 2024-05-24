import mongoose, { Schema } from 'mongoose';
import * as schemas from './subSchemas';

const orderSchema = new mongoose.Schema({
    transportstatus: { type: String, required: true, enum: ['delivered', 'not delivered'] },
    date: { type: Date, required: true },
    paymentmethod: { type: String },
    products: [schemas.orderedProductSchema],
    userID: { type: Schema.Types.ObjectId },
    phonenumber: { type: String },
    address: { type: schemas.addressSchema },
    email: { type: String },
    name: { type: String },
    total: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
