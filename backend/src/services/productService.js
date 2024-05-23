import * as models from '../models';

export const getAllProducts = async () => {
    return await models.Product.find();
};

export const getProductByID = async (id) => {
    return await models.Product.findOne({ _id: id });
};

export const checkProductAmount = async (amount, id) => {
    const product = await models.Product.findOne({ _id: id });

    return product.amount >= amount;
};

export const reduceProductAmount = async (amount, id) => {
    const product = await models.Product.findOne({ _id: id });
    const amountLeft = product.amount - amount;

    return await models.Product.updateOne({ _id: id }, { $set: { amount: amountLeft } });
};

export const searchProducts = async (params) => {
    const query = { ...params };

    if (query.name) {
        query.name = new RegExp(query.name, 'i');
    }

    const products = models.Product.find(query);

    return products;
};
