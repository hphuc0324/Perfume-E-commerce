import jwt from 'jsonwebtoken';

export const verifyLoginToken = (req, res, next) => {
    const token = req.cookies.loginToken;
    if (!token) {
        return res.status(200).json({ user: null });
    } else {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(200).json({ user: null });
            } else {
                req.userID = decoded;
                next();
            }
        });
    }
};

export const parseCartToken = (req, res, next) => {
    const token = req.cookies.cartToken;
    if (!token) {
        next();
    } else {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                next();
            } else {
                req.data = decoded;
                next();
            }
        });
    }
};
