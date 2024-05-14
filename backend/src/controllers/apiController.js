import * as services from '../services';
import { createLoginToken } from '../utils/tokenCreator';
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
