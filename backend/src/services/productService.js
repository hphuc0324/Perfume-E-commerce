import * as models from '../models';

export const getAllProducts = async () => {
    return await models.Product.find();
};
