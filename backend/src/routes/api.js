import express from 'express';
const router = express.Router();

import * as apiControllers from '../controllers/apiController';
import { verifyLoginToken } from '../middleware/token';

const initApi = (app) => {
    router.get('/');
    router.post('/login', apiControllers.login);
    router.post('/register', apiControllers.register);
    router.get('/checkLoginStatus', verifyLoginToken, apiControllers.checkLoginStatus);

    return app.use('/api/v1', router);
};

export default initApi;
