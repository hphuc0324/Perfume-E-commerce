import * as models from '../models';

export const createOrder = async (params) => {
    const order = await models.Order.create(params);

    return order;
};

export const searchOrders = async (params) => {
    return await models.Order.find(params);
};
