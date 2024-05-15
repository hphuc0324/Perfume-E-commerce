import mongoose from 'mongoose';

const supportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
});

const Support = mongoose.model('Support', supportSchema);

export default Support;
