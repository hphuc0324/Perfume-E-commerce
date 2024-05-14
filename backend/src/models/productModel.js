import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    scent: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    avatar: { type: String },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
