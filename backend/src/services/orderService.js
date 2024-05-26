import * as models from '../models';

export const createOrder = async (params) => {
    const order = await models.Order.create(params);

    return order;
};

export const searchOrders = async (params) => {
    return await models.Order.find(params);
};

export const updateOrder = async (data, orderID) => {
    return await models.Order.findByIdAndUpdate(orderID, { $set: data });
};

export const updateOrderProductStatus = async (orderID, productID) => {
    const order = await models.Order.findOne({ _id: orderID });

    if (!order) {
        console.log(`Order ${orderID} not found`);
        return null;
    }

    const index = order.products.findIndex((product) => product.productID.toString() === productID);
    console.log(productID);

    if (index === -1) {
        console.log(`Product ${productID} not found`);
        return null;
    }

    order.products[index].status = 'reviewed';

    await order.save();

    return order;
};
