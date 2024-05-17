import * as models from '../models';

export const findReviewByProductID = async (productId) => {
    return await models.ProductReview.find({ productId: productId }).populate('userId', 'name');
};
