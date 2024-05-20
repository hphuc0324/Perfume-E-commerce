import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Delivery.module.scss';
import UserContext from '../../context/userContext';
import images from '../../assets/images';
import request from '../../utils/request';

const cx = classNames.bind(styles);

function Delivery() {
    const [step, setStep] = useState(1);
    const { user } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState(null);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [order, setOrder] = useState(null);

    const handleChangeStep = (step) => {
        setStep(step);
    };

    const handlePurchase = async (e = null) => {
        if (e) {
            e.preventDefault();
        }
        try {
            const res = await request.post('/purchase', {
                products: products,
                user: user,
                phoneNumber: phoneNumber,
                paymentMethod: paymentMethod,
            });

            setOrder(res.data.order);

            if (res.data.order !== null) {
                setStep(4);
            }
        } catch (err) {
            setOrder(null);
        }
    };

    console.log(step);

    const handlePaymentMethod = async () => {
        if (paymentMethod === 'cod') {
            await handlePurchase();
        } else {
            setStep(3);
        }
    };

    const fetchUserInfo = async () => {
        try {
            const res = await request.get('/getUserInfo');

            setUserInfo(res.data.user);

            if (res.data.user) {
                setName(res.data.user.name);
                setPhoneNumber(res.data.user.phonenumber);
                setEmail(res.data.user.gmail);
            }
        } catch (err) {
            setUserInfo(null);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await request.get('/getCartProducts');

            setProducts(res.data.products);
        } catch (err) {
            setProducts([]);
        }
    };

    useEffect(() => {
        setTotal(products.reduce((value, product) => value + product.productPrice * product.quantity, 0));
    }, [products]);

    //Fetch cart products
    useEffect(() => {
        fetchProducts();
    }, []);

    //Fetch user information
    useEffect(() => {
        fetchUserInfo();
    }, [user]);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('page-path')}>
                Shopping cart / <b>Delivery Information </b>
            </span>

            <div className={cx('container')}>
                {step === 1 && (
                    <div className={cx('user-info')}>
                        <span className={cx('form-header')}>Delivery information</span>
                        {userInfo ? (
                            <span className={cx('user')}>
                                <FontAwesomeIcon icon={faUser} />
                                <span className={cx('user-info-label')}>
                                    {' '}
                                    {userInfo.name} {userInfo.gmail}
                                </span>
                            </span>
                        ) : (
                            <span className={cx('to-login')}>
                                Do you have an account?{' '}
                                <b>
                                    <Link to="/login">Login</Link>
                                </b>
                            </span>
                        )}

                        <form className={cx('information-form')} onSubmit={() => handleChangeStep(2)}>
                            <div className={cx('form-row')}>
                                <input
                                    className={cx('form-input', 'half')}
                                    placeholder="Your name: "
                                    readOnly={userInfo}
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    className={cx('form-input', 'half')}
                                    placeholder="Phone number: "
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={cx('form-row')}>
                                <input
                                    className={cx('form-input', 'full')}
                                    placeholder="Email: "
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className={cx('form-field')}>
                                <input
                                    className={cx('form-input', 'full')}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Address"
                                    required
                                />
                                <input
                                    className={cx('form-input', 'third')}
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="City/Province"
                                    required
                                />
                                <input
                                    className={cx('form-input', 'third')}
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    placeholder="District"
                                    required
                                />
                                <input
                                    className={cx('form-input', 'third')}
                                    value={ward}
                                    onChange={(e) => setWard(e.target.value)}
                                    placeholder="Ward"
                                    required
                                />
                            </div>

                            <div className={cx('form-actions')}>
                                <Link to="/cart">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                </Link>

                                <button type="submit" className={cx('submit-btn')}>
                                    Continue to payment method
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <form className={cx('payment')} onSubmit={handlePaymentMethod}>
                        <span className={cx('form-header')}>Payment method</span>
                        <div className={cx('form-field')}>
                            <div className={cx('form-input', 'full', 'payment-choice')}>
                                <input
                                    type="radio"
                                    name="payment-method"
                                    value="cod"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    required
                                />
                                <span className={cx('payment-type')}>Pay on delivery (COD)</span>
                            </div>
                            <div className={cx('form-input', 'full', 'payment-choice')}>
                                <input
                                    type="radio"
                                    name="payment-method"
                                    value="ATM"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    required
                                />
                                <span className={cx('payment-type')}>ATM</span>
                            </div>
                        </div>
                        <div className={cx('form-actions')}>
                            <Link to="/cart">
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </Link>

                            <button type="submit" className={cx('submit-btn')}>
                                Order fullfillment
                            </button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <div className={cx('atm-payment')}>
                        <span className={cx('form-header')}>Payment through ATM</span>
                        <form className={cx('atm-form')} onSubmit={handlePurchase}>
                            <div className={cx('form-row')}>
                                <label className={cx('form-label')}>Card number</label>
                                <input placeholder="Enter your card number" className={cx('form-input')} required />
                            </div>
                            <div className={cx('form-row')}>
                                <label className={cx('form-label')}>Cardholder name (unsigned)</label>
                                <input placeholder="Enter your card number" className={cx('form-input')} required />
                            </div>
                            <div className={cx('form-row')}>
                                <label className={cx('form-label')}>Password</label>
                                <input
                                    placeholder="Enter your card number"
                                    type="password"
                                    className={cx('form-input')}
                                    required
                                />
                            </div>

                            <div className={cx('form-actions')}>
                                <button onClick={() => handleChangeStep(2)} className={cx('submit-btn')}>
                                    Cancel
                                </button>

                                <button type="submit" className={cx('submit-btn')}>
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 4 && (
                    <div className={cx('order')}>
                        <div className={cx('order-status')}>
                            <span className={cx('order-icon')}>
                                <FontAwesomeIcon icon={faCircleCheck} />
                            </span>

                            <div className={cx('order-detail')}>
                                <span className={cx('order-header')}>Order Success</span>
                                <span className={cx('order-id')}>Order ID: {order._id}</span>
                            </div>
                        </div>

                        <div className={cx('owner')}>
                            <span className={cx('order-header')}>Order Information</span>

                            <span className={cx('order-row')}>Name: {name}</span>
                            <span className={cx('order-row')}>Phone: {phoneNumber}</span>
                            <span className={cx('order-row')}>
                                Address: {address}, ward {ward}, district {district}, {city}
                            </span>

                            <span className={cx('order-header')}>Order Information</span>
                            <span className={cx('order-row')}>{paymentMethod}</span>
                        </div>

                        <Link to="/perfume" className={cx('submit-btn')}>
                            Continue to Shopping
                        </Link>
                    </div>
                )}

                <div className={cx('products')}>
                    <div className={cx('headers')}>
                        <span className={cx('first-col')}>Products</span>
                        <span>Quantity</span>
                        <span>Price</span>
                    </div>
                    {products.map((product, index) => (
                        <div key={index} className={cx('product')}>
                            <div className={cx('product-info')}>
                                <img src={images.about} className={cx('product-image')} />
                                <span className={cx('product-name')}>{product.productName}</span>
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
                    <div className={cx('separator')}></div>

                    <div className={cx('total-information')}>
                        <div className={cx('price')}>
                            <span className={cx('price-total')}>Provision</span>
                            <span className={cx('price-total')}>
                                {total.toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </div>

                        <div className={cx('shipping')}>
                            <span className={cx('ship-total')}>Shipping fee</span>
                            <span>-</span>
                        </div>
                    </div>

                    <div className={cx('separator')}></div>

                    <div className={cx('final')}>
                        <span>Total</span>
                        <span>
                            {total.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Delivery;
