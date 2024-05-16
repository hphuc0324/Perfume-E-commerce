import multer from 'multer';
import cloudinary from './cloudinaryConfig';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'perfume-ecommerce/products',
        allowedFormats: ['jpg', 'png', 'jpeg'],
    },
});

export const uploadSingle = multer({ storage: storage }).single('image');
export const uploadMultiple = multer({ storage: storage }).array('images', 10);
export const uploadFields = multer({ storage: storage }).fields([
    { name: 'image_1', maxCount: 1 },
    { name: 'image_2', maxCount: 1 },
    { name: 'image_3', maxCount: 1 },
]);
