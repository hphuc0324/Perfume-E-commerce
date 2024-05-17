import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import request from '../../utils/request';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import images from '../../assets/images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Cart() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await request.get('/getCartProducts');
            setProducts(res.data.products);
        } catch (err) {
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('page-path')}>
                Home / <b>Cart</b>
            </span>
            <span className={cx('page-header')}>Shopping cart</span>
            {products.length > 0 ? (
                <div className={cx('cart-products')}>
                    <div className={cx('cart-headers')}>
                        <span className={cx('cart-header', 'first-col')}>Item</span>
                        <span className={cx('cart-header', 'second-col')}>Quantity</span>
                        <span className={cx('cart-header', 'third-col')}>Order value</span>
                    </div>

                    <div className={cx('products')}>
                        {products.map((product, index) => (
                            <div key={index} className={cx('product')}>
                                <div className={cx('product-info')}>
                                    <img src={images.about} className={cx('product-image')} />
                                    <div className={cx('product-actions')}>
                                        <span className={cx('product-name')}>{product.productName}</span>
                                        <div className={cx('delete-action')}>
                                            <span className={cx('delete-label')}>Delete</span>
                                            <button className={cx('delete-btn')}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <span className={cx('product-quantity')}>{product.quantity}</span>
                                <span className={cx('product-price')}>150000</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className={cx('no-products')}>
                    <span className={cx('no-products-label')}>Your cart is empty</span>
                    <Link to="/perfume" className={cx('no-products-btn')}>
                        Continue to shopping
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Cart;
