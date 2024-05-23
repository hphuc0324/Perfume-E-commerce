import bcrypt from 'bcrypt';

import * as models from '../models';
import { saltRounds } from '../config/config';

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

export const searchUsers = async (params) => {
    const query = { ...params, page: null, limit: null };

    return await models.User.find(query)
        .skip((params.pages + 1) * params.limit)
        .limit(params.limit);
};

export const updateUser = async (data, userID) => {
    return await models.User.updateOne(
        { _id: userID },
        {
            $set: {
                name: data.name,
                phonenumber: data.phonenumber,
                gender: data.gender,
                address: data.address,
                gmail: data.email,
            },
        },
    );
};
