import * as models from '../models';

export const searchProductReviews = async (params) => {
    return await models.ProductReview.find(params).populate('userId', 'name');
};
