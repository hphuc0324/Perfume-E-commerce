import * as models from '../models';

export const createSupport = async (name, email, subject, message) => {
    const support = await models.Support.create({
        name: name,
        email: email,
        subject: subject,
        message: message,
    });

    return support;
};
