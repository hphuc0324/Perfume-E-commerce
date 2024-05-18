import bcrypt from 'bcrypt';

import * as models from '../models';
import { saltRounds } from '../config/config';

export const findUserByUsername = async (username) => {
    const user = await models.User.findOne({ account: username });

    return user;
};

export const createUser = async (account, password, name, phonenumber, gender, role = 'user') => {
    const passwordHashed = await bcrypt.hash(password, saltRounds);

    const user = await models.User.create({
        account: account,
        password: passwordHashed,
        name: name,
        phonenumber: phonenumber,
        gender: gender,
        role: role,
    });

    return user;
};

export const findUserByID = async (id) => {
    const user = await models.User.findOne({ _id: id });

    return user;
};
