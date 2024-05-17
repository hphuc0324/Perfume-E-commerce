import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const createLoginToken = (userID) => {
    const token = jwt.sign({ userID: userID }, process.env.JWT_SECRET_KEY, parseInt(process.env.JWT_EXPIRE_TIME));

    return token;
};

export const createCartToken = (products) => {
    const token = jwt.sign({ products: products }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_CART_EXPIRATION_TIME,
    });

    return token;
};
