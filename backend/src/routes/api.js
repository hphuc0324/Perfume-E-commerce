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
    router.post('/updateUser', verifyLoginToken, apiControllers.updateUserInfo);
    router.get('/getUserInfo', verifyLoginToken, apiControllers.getUserInfo);
    router.get('/users/search', apiControllers.searchUsers);

    router.get('/products/search', apiControllers.searchProducts);

    router.post('/addToCart', parseCartToken, apiControllers.addToCart);
    router.get('/getCartProducts', parseCartToken, apiControllers.getCartProducts);
    router.get('/removeFromCart', parseCartToken, apiControllers.deleteCartProduct);
    router.get('/getCartDetails', parseCartToken, apiControllers.getCartDetails);

    router.get('/productsReviews/search', apiControllers.searchProductReviews);

    router.get('/orders/search', apiControllers.searchOrders);
    router.post('/purchase', apiControllers.createOrder);
    router.get('/getOrdersDetails', apiControllers.getOrdersDetails);

    router.post('/contact', apiControllers.addContact);

    return app.use('/api/v1', router);
};

export default initApi;
