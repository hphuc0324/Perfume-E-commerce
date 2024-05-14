import * as services from '../services';
import { createLoginToken } from '../utils/tokenCreator';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await services.user.findUserByUsername(username);
        let passwordMatch;

        try {
            // passwordMatch = await bcrypt.compare(password, user.password);
            passwordMatch = password === user.password;
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

export const checkLoginStatus = (req, res) => {
    return res.status(200).json({ user: req.userID });
};
