import mongoose, { Schema } from 'mongoose';

const orderSchema = new mongoose.Schema({
    transportstatus: { type: String, required: true, enum: ['delivered', 'not delivered'] },
    date: { type: Date, required: true },
    paymentmethod: { type: String },
    products: { type: Schema.Types.Array },
    userID: { type: Schema.Types.ObjectId },
    phonenumber: { type: String },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
