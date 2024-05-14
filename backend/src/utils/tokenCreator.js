import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const createLoginToken = (userID) => {
    const token = jwt.sign({ userID: userID }, process.env.JWT_SECRET_KEY, parseInt(process.env.JWT_EXPIRE_TIME));

    return token;
};
