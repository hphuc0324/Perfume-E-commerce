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
    const [changedProducts, setChangedProducts] = useState([]);
    const [products, setProducts] = useState([]);

    const handleDeleteProduct = async (productId) => {
        try {
            const res = await request.get('/removeFromCart', { params: { productId: productId } });

            setChangedProducts(res.data.products);
        } catch (err) {}
    };

    const fetchProducts = async () => {
        try {
            const res = await request.get('/getCartDetails');
            setProducts(res.data.products);
        } catch (err) {
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [changedProducts]);

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
                                    <img src={product.avatar} className={cx('product-image')} />
                                    <div className={cx('product-actions')}>
                                        <span className={cx('product-name')}>{product.productName}</span>
                                        <div className={cx('delete-action')}>
                                            <span className={cx('delete-label')}>Delete</span>
                                            <button
                                                className={cx('delete-btn')}
                                                onClick={() => handleDeleteProduct(product.productId)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <span className={cx('product-quantity')}>{product.quantity}</span>
                                <span className={cx('product-price')}>
                                    {(product.productPrice * product.quantity).toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className={cx('others')}>
                        <span className={cx('describe')}>
                            We offer complimentary standard shipping. Delivery generally takes 2 to 4 working days from
                            the order confirmation date. Please note that personalisation may add up to 7-10 business
                            days to processing and delivery time
                        </span>
                        <div className={cx('payment')}>
                            <span className={cx('payment-header')}>Sub-Total</span>
                            <span className={cx('payment-value')}>
                                {products
                                    .reduce((value, product) => value + product.productPrice * product.quantity, 0)
                                    .toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                            </span>
                        </div>
                    </div>

                    <Link to="/delivery" className={cx('purchase-btn')}>
                        To purchase
                    </Link>
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
