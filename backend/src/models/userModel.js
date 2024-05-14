import mongoose, { model } from 'mongoose';

import * as schemas from './subSchemas';

const userSchema = new mongoose.Schema({
    account: { type: String, required: true },
    password: { type: String, required: true },
    gmail: { type: String },
    name: { type: String, required: true },
    address: { type: schemas.addressSchema },
    phonenumber: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'], default: 'user' },
    status: { type: String, required: true, enum: ['available', 'locked'], default: 'available' },
    totalpayment: { type: Number, required: true, default: 0 },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
});

const User = mongoose.model('User', userSchema);

export default User;
