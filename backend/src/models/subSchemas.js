import mongoose from 'mongoose';

export const addressSchema = new mongoose.Schema({
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    housenumber: { type: String, required: true },
});
