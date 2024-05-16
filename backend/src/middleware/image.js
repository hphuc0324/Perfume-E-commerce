import upload from '../config/multerConfig';

const uploadMutipleImages = upload.array('images', 10);
