import mongoose from 'mongoose';

export const addressSchema = new mongoose.Schema(
    {
        city: { type: String, required: true },
        district: { type: String, required: true },
        ward: { type: String, required: true },
        housenumber: { type: String, required: true },
    },
    { _id: false },
);

export const orderedProductSchema = new mongoose.Schema(
    {
        productID: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
    },
    { _id: false },
);
