import express from 'express';
const router = express.Router();

import * as apiControllers from '../controllers/apiController';
import { verifyLoginToken } from '../middleware/token';

const initApi = (app) => {
    router.get('/');
    router.post('/login', apiControllers.login);
    router.get('/logout', apiControllers.logout);
    router.post('/register', apiControllers.register);
    router.get('/checkLoginStatus', verifyLoginToken, apiControllers.checkLoginStatus);
    router.post('/contact', apiControllers.addContact);
    router.get('/products', apiControllers.getAllProducts);
    router.get('/products/name', apiControllers.getProductsByName);

    return app.use('/api/v1', router);
};

export default initApi;
