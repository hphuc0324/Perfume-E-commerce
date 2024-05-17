import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './Product.module.scss';
import images from '../../assets/images';
import request from '../../utils/request';

import PopupMessage from '../PopupMessage';

const cx = classNames.bind(styles);

function Product({ product, horizontal = false }) {
    const [popup, setPopup] = useState(false);
    const [messages, setMessages] = useState([]);
    const [header, setHeader] = useState('');

    const handleAddToCart = async (e) => {
        e.preventDefault();
        try {
            const res = await request.post('/addToCart', {
                productId: product._id,
                productName: product.name,
                quantity: 1,
            });

            if (res.data.message === '') {
                setMessages([product.name, 'Quantity: 1']);
                setHeader('Product added to cart');
            } else {
                setMessages([res.data.message]);
            }
        } catch (err) {
            setMessages(['An error occurred while adding to cart! Please try again']);
        }

        setPopup(true);
    };

    return (
        <Link to={`/product/${product._id}`} className={cx('wrapper', { horizontal: horizontal })}>
            <img src={images.about} alt="product image" className={cx('product-image')} />

            <div className={cx('product-info')}>
                <span className={cx('product-name')}>{product.name}</span>
                <span className={cx('product-price')}>
                    {product.discount === 0
                        ? product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                        : (product.price - (product.price * product.discount) / 100).toLocaleString('it-IT', {
                              style: 'currency',
                              currency: 'VND',
                          })}
                </span>
                {product.discount !== 0 && (
                    <span className={cx('product-old-price')}>
                        ({product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })})
                    </span>
                )}

                <button className={cx('addToCart-btn')} onClick={handleAddToCart}>
                    <FontAwesomeIcon icon={faCartShopping} />
                </button>
            </div>
            {product.discount !== 0 && <div className={cx('discount-tag')}>-{product.discount}%</div>}

            {popup && (
                <PopupMessage
                    image={images.about}
                    header={header}
                    messageRow={messages}
                    callback={(e) => {
                        e.preventDefault();

                        setPopup(false);
                    }}
                />
            )}
        </Link>
    );
}

export default Product;
