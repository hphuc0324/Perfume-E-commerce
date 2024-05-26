import * as models from '../models';

export const searchProductReviews = async (params) => {
    return await models.ProductReview.find(params).populate('userId', 'name');
};

export const createProductReview = async (params) => {
    return await models.ProductReview.create({
        date: new Date(),
        content: params.content,
        userId: params.userId,
        productId: params.productId,
        stars: params.stars,
    });
};
