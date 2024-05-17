import * as services from '../services';
import { createCartToken, createLoginToken } from '../utils/tokenCreator';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await services.user.findUserByUsername(username);
        let passwordMatch;

        try {
            passwordMatch = await bcrypt.compare(password, user.password);
        } catch (error) {}

        if (!user || !passwordMatch) {
            return res.status(200).json({
                message: 'Wrong username or password',
            });
        }

        const token = createLoginToken(user._id);
        res.cookie('loginToken', token);
        return res.status(200).json({ user: user._id, message: '' });
    } catch (err) {
        console.log(err);

        return res.status(200).json({
            message: 'User not found',
        });
    }
};

export const logout = async (req, res) => {
    res.clearCookie('loginToken');
    return res.status(200).json({ user: null });
};

export const register = async (req, res) => {
    const { account, password, name, gender, phonenumber } = req.body;

    console.log(req.body);

    try {
        let user;

        user = await services.user.findUserByUsername(account);

        if (user) {
            return res.status(200).json({
                message: 'Account already exists! Please choose another account name',
            });
        }
        console.log('in');
        try {
            const user = await services.user.createUser(account, password, name, phonenumber, gender);

            const token = createLoginToken(user._id);
            res.cookie('loginToken', token);
            return res.status(200).json({ user: user._id, message: '' });
        } catch (err) {
            console.log(err);
            return res.status(200).json({
                message: 'Error while creating user! Please try again later',
            });
        }
    } catch (err) {}
};

export const checkLoginStatus = (req, res) => {
    return res.status(200).json({ user: req.userID });
};

export const addContact = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const support = await services.support.createSupport(name, email, subject, message);

        if (support) {
            return res.status(200).json({
                message: '',
            });
        }

        return res.status(200).json({
            message: 'Error while creating support! Please try again later',
        });
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            message: 'Error while creating support! Please try again later',
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await services.product.getAllProducts();

        return res.status(200).json({ products: products });
    } catch (err) {
        console.log(err);

        return res.status(200).json({ products: [] });
    }
};

export const getProductsByName = async (req, res) => {
    const { name } = req.query;

    try {
        let products = await services.product.getAllProducts();

        products = products.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()));

        return res.status(200).json({ products: products });
    } catch (err) {
        return res.status(200).json({ products: [] });
    }
};

export const getProductByID = async (req, res) => {
    const { id } = req.params;

    try {
        if (id === undefined || id === null) {
            return res.status(200).json({ product: null });
        }

        const product = await services.product.getProductByID(id);

        if (product) {
            return res.status(200).json({ product: product });
        }
        return res.status(200).json({ product: null });
    } catch (err) {
        console.log(err);

        return res.status(200).json({ product: null });
    }
};

export const getProductReviewByID = async (req, res) => {
    const { productId } = req.query;

    try {
        const reviews = await services.productReview.findReviewByProductID(productId);

        if (reviews.length > 0) {
            return res.status(200).json({ reviews: reviews });
        }
        return res.status(200).json({ reviews: [] });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ reviews: [] });
    }
};

export const addToCart = async (req, res) => {
    const { productId, productName, quantity } = req.body;

    if (quantity === null || quantity === undefined || quantity === '') {
        quantity = 1;
    }

    try {
        let cartToken = req.cookies.cartToken;

        if (cartToken === null || cartToken === undefined) {
            const products = [{ productId: productId, productName: productName, quantity: quantity }];

            cartToken = createCartToken(products);
            res.cookie('cartToken', cartToken);
            return res.status(200).json({ message: '' });
        } else {
            let done = false;
            console.log(req.data.products);
            console.log('quantity added:' + quantity);
            for (let product of req.data.products) {
                if (product.productId === productId) {
                    product.quantity += quantity;
                    done = true;
                    break;
                }
            }

            if (!done) {
                req.data.products.push({ productId: productId, productName: productName, quantity: quantity });
            }

            cartToken = createCartToken(req.data.products);
            res.cookie('cartToken', cartToken);
            return res.status(200).json({ message: '' });
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ message: 'Some errors occured while adding product to Cart! Please try again' });
    }
};

export const getCartProducts = async (req, res) => {
    if (!req.cookies.cartToken) {
        return res.status(200).json({ products: [] });
    }

    return res.status(200).json({ products: req.data.products });
};
