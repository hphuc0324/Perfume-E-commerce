import * as models from '../models';

export const getAllProducts = async () => {
    return await models.Product.find();
};

export const getProductByID = async (id) => {
    return await models.Product.findOne({ _id: id });
};
