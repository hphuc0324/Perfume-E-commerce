import * as services from '../services';
import { createCartToken, createLoginToken } from '../utils/tokenCreator';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const users = await services.user.searchUsers({ account: username });
        const user = users[0];
        let passwordMatch;

        try {
            passwordMatch = await bcrypt.compare(password, user.password);
        } catch (error) {}

        if (!user || !passwordMatch) {
            return res.status(200).json({
                message: 'Wrong username or password',
            });
        }

        const token = createLoginToken(user._id, user.role);
        res.cookie('loginToken', token);
        return res.status(200).json({ user: user._id, role: user.role, message: '' });
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

    try {
        let user;

        user = await services.user.searchUsers(account);

        if (user) {
            return res.status(200).json({
                message: 'Account already exists! Please choose another account name',
            });
        }
        console.log('in');
        try {
            const user = await services.user.createUser(account, password, name, phonenumber, gender);

            const token = createLoginToken(user._id, user.role);
            res.cookie('loginToken', token);
            return res.status(200).json({ user: user._id, role: user.role, message: '' });
        } catch (err) {
            console.log(err);
            return res.status(200).json({
                message: 'Error while creating user! Please try again later',
            });
        }
    } catch (err) {}
};

export const checkLoginStatus = async (req, res) => {
    return res.status(200).json({ user: req.userID, role: req.role });
};

export const getUserInfo = async (req, res) => {
    if (req.userID === null) {
        return res.status(200).json({ user: null });
    }

    try {
        const user = await services.user.findUserByID(req.userID.userID);

        const userInfo = {
            name: user.name,
            gender: user.gender,
            phonenumber: user.phonenumber,
            address: user.address ? user.address : null,
            gmail: user.gmail ? user.gmail : null,
        };

        return res.status(200).json({ user: userInfo });
    } catch (err) {
        return res.status(500).json({ user: null });
    }
};

export const searchUsers = async (req, res) => {
    const params = req.query;
    try {
        const users = await services.user.searchUsers(params);

        return res.status(200).json({ users: users });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ users: [] });
    }
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

export const searchProductReviews = async (req, res) => {
    const params = req.query;

    try {
        const reviews = await services.productReview.searchProductReviews(params);

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
    const { productId, quantity } = req.body;

    if (quantity === null || quantity === undefined || quantity === '') {
        quantity = 1;
    }

    try {
        let cartToken = req.cookies.cartToken;

        if (cartToken === null || cartToken === undefined) {
            const products = [{ productId: productId, quantity: quantity }];

            cartToken = createCartToken(products);
            res.cookie('cartToken', cartToken);
            return res.status(200).json({ message: '' });
        } else {
            let done = false;

            for (let product of req.data.products) {
                if (product.productId === productId) {
                    product.quantity += quantity;
                    done = true;
                    break;
                }
            }

            if (!done) {
                req.data.products.push({
                    productId: productId,

                    quantity: quantity,
                });
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

export const getCartDetails = async (req, res) => {
    if (!req.data) {
        return res.status(200).json({ products: [] });
    }

    try {
        const products = req.data.products;
        const productIDs = products.map((product) => product.productId);

        const initialProducts = await services.product.searchProducts({ _id: { $in: productIDs } });

        const details = products.map((product) => {
            const mapped = initialProducts.find((p) => p._id.toString() === product.productId);

            return {
                productId: product.productId,
                productName: mapped.name,
                quantity: product.quantity,
                productPrice:
                    mapped.discount === 0
                        ? mapped.price * product.quantity
                        : (mapped.price - (mapped.price * mapped.discount) / 100) * product.quantity,
                avatar: mapped.avatar,
            };
        });
        return res.status(200).json({ products: details });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ products: [] });
    }
};

export const deleteCartProduct = async (req, res) => {
    const { productId } = req.query;

    try {
        if (!req.cookies.cartToken) {
            return res.status(200).json({ products: [] });
        }

        let products = req.data.products;

        products = products.filter((product) => product.productId !== productId);

        const cartToken = createCartToken(products);
        res.cookie('cartToken', cartToken);
        return res.status(200).json({ products: products });
    } catch (err) {
        console.log(err);
    }
};

export const createOrder = async (req, res) => {
    const { deliveryInfo, orderDetails, userID } = req.body;

    try {
        const products = orderDetails.products.map((product) => ({
            productID: product.productId,
            quantity: product.quantity,
        }));

        for (let product of products) {
            console.log(product);
            const enough = await services.product.checkProductAmount(product.quantity, product.productID);

            if (!enough) {
                return res.status(200).json({
                    message: `Product ${orderDetails.products.find((p) => p.productId === product.productID).productName} is out of stock!`,
                    order: null,
                });
            }
        }

        for (let product of products) {
            await services.product.reduceProductAmount(product.quantity, product.productID);
        }

        const data = {
            products: products,
            transportstatus: 'not delivered',
            date: new Date(),
            paymentmethod: orderDetails.paymentMethod,
            total: orderDetails.total,
            userID: userID,
            email: deliveryInfo.email,
            name: deliveryInfo.name,
            phonenumber: deliveryInfo.phoneNumber,
            address: deliveryInfo.address,
        };

        const order = await services.order.createOrder(data);

        res.clearCookie('cartToken');
        return res.status(200).json({ order: order });
    } catch (err) {
        console.log(err);

        return res.status(200).json({ order: null, message: 'Error while purchasing orders, please try again later!' });
    }
};

export const searchOrders = async (req, res) => {
    const params = req.query;

    try {
        const orders = await services.order.searchOrders(params);

        return res.status(200).json({ orders: orders });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ orders: [] });
    }
};

export const updateUserInfo = async (req, res) => {
    const data = req.body;

    try {
        const user = await services.user.updateUser(data.userInfo, req.userID.userID);

        if (!user) {
            return res.status(200).json({ message: 'Error while updating user info! Please try again later' });
        }

        return res.status(200).json({ message: '' });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ message: 'Error while updating user info! Please try again later' });
    }
};

export const searchProducts = async (req, res) => {
    const params = req.query;

    try {
        const products = await services.product.searchProducts(params);
        return res.status(200).json({ products: products });
    } catch (err) {
        console.log(err);
        return res.status(200).json({ products: [] });
    }
};
