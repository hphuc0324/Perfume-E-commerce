import * as models from '../models';
import { saltRounds } from '../config/config';

export const findUserByUsername = async (username) => {
    const user = await models.User.findOne({ account: username });

    return user;
};
