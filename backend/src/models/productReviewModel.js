import mongoose, { Schema } from 'mongoose';

const productReviewSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    content: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const ProductReview = mongoose.model('ProductReview', productReviewSchema);

export default ProductReview;
