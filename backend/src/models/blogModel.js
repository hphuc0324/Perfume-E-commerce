import mongoose, { Schema } from 'mongoose';

const blogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hashtag: { type: String, required: true },
    content: { type: String, required: true },
    shortdescription: { type: String, required: true },
    avatar: { type: String },
    url: { type: String },
    date: { type: Date, required: true },
    category: { type: String },
    owner: { type: Schema.Types.ObjectId },
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
