import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as normalStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as filledStar } from '@fortawesome/free-solid-svg-icons';

import styles from './RatingModal.module.scss';
import PopupMessage from '../PopupMessage';

import request from '../../utils/request';

const cx = classNames.bind(styles);

function RatingModal({ params, setActive }) {
    const [stars, setStars] = useState(1);
    const [review, setReview] = useState('');
    const [noti, setNoti] = useState({
        active: false,
        messages: [],
        header: '',
    });

    console.log(params);

    const handleCancel = () => {
        setStars(1);
        setReview('');
        setActive(false);
    };

    const handleConfirm = async (e) => {
        e.preventDefault();

        try {
            const res = await request.post('/addProductsReview', {
                userId: params.user,
                orderID: params.orderID,
                productId: params.product._id,
                stars: stars,
                content: review,
            });

            setNoti({
                active: true,
                messages: [res.data.message],
                header: res.data.notiHeader,
            });
        } catch (err) {
            setNoti({
                active: true,
                messages: ['Error while adding review! Please try again.'],
                header: 'Adding review failed',
            });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3 className={cx('header')}>ADD YOUR REVIEW</h3>
                <div className={cx('product')}>
                    <img src={params.product.avatar} className={cx('product-avatar')} />
                    <span className={cx('product-name')}>{params.product.name}</span>
                </div>

                <form>
                    <div className={cx('star-rating')}>
                        <span className={cx('section-header')}>Rating</span>
                        <div className={cx('stars')}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    type="button"
                                    key={value}
                                    className={cx('star-btn')}
                                    onClick={() => setStars(value)}
                                >
                                    <FontAwesomeIcon icon={value > stars ? normalStar : filledStar} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={cx('review-rating')}>
                        <span className={cx('section-header')}>Review</span>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                            className={cx('review-content')}
                        ></textarea>
                    </div>

                    <div className={cx('actions')}>
                        <button type="button" className={cx('action-btn')} onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit" className={cx('action-btn')} onClick={handleConfirm}>
                            Continue
                        </button>
                    </div>
                </form>
            </div>

            {noti.active && (
                <PopupMessage
                    messageRow={noti.messages}
                    header={noti.header}
                    callback={() => {
                        setNoti((prev) => ({
                            ...prev,
                            active: false,
                        }));
                        setActive(false);
                    }}
                />
            )}
        </div>
    );
}

export default RatingModal;
