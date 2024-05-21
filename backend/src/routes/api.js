import express from 'express';
const router = express.Router();

import * as apiControllers from '../controllers/apiController';
import { verifyLoginToken, parseCartToken } from '../middleware/token';

const initApi = (app) => {
    router.get('/');
    router.post('/login', apiControllers.login);
    router.get('/logout', apiControllers.logout);
    router.post('/register', apiControllers.register);
    router.get('/checkLoginStatus', verifyLoginToken, apiControllers.checkLoginStatus);
    router.post('/contact', apiControllers.addContact);
    router.get('/products', apiControllers.getAllProducts);
    router.get('/products/name', apiControllers.getProductsByName);
    router.get('/product/:id', apiControllers.getProductByID);
    router.get('/getProductReview', apiControllers.getProductReviewByID);
    router.post('/addToCart', parseCartToken, apiControllers.addToCart);
    router.get('/getCartProducts', parseCartToken, apiControllers.getCartProducts);
    router.get('/deleteProduct', parseCartToken, apiControllers.deleteCartProduct);
    router.get('/getUserInfo', verifyLoginToken, apiControllers.getUserInfo);
    router.post('/purchase', apiControllers.createOrder);
    router.get('/getAllUsers', apiControllers.getAllUsers);
    router.get('/getAllOrders', apiControllers.getAllOrders);
    router.post('/updateUser', verifyLoginToken, apiControllers.updateUserInfo);

    return app.use('/api/v1', router);
};

export default initApi;
