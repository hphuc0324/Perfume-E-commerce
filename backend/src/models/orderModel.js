import mongoose, { Schema } from 'mongoose';

const orderSchema = new mongoose.Schema({
    transportstatus: { type: String, required: true, enum: ['delivered', 'not delivered'] },
    date: { type: Date, required: true },
    price: { type: Number },
    paymentmethod: { type: String },
    productID: { type: Schema.Types.ObjectId },
    userID: { type: Schema.Types.ObjectId },
});
