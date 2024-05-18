import * as models from '../models';

export const createOrder = async (products, userID, phoneNumber, paymentMethod) => {
    const order = await models.Order.create({
        transportstatus: 'not delivered',
        date: new Date(),
        paymentmethod: paymentMethod,
        products: products,
        userID: userID,
        phonenumber: phoneNumber,
    });

    return order;
};
