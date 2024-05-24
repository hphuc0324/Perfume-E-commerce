import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Delivery.module.scss';
import UserContext from '../../context/userContext';
import request from '../../utils/request';
import PopupMessage from '../../components/PopupMessage';

const cx = classNames.bind(styles);

function Delivery() {
    const [step, setStep] = useState(1);
    const { user } = useContext(UserContext);
    const [deliveryInfo, setDeliveryInfo] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: {
            housenumber: '',
            city: '',
            district: '',
            ward: '',
        },
    });
    const [order, setOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState({
        products: [],
        paymentMethod: '',
        total: 0,
    });
    const [popup, setPopup] = useState(false);
    const [message, setMessage] = useState([]);

    const handleChangeStep = (step) => {
        setStep(step);
    };

    const handleChangeData = (e) => {
        const { name, value } = e.target;

        const newData = {
            ...deliveryInfo,
            [name]: value,
        };

        setDeliveryInfo(newData);
    };

    const handleChangeSubData = (e) => {
        const { name, value } = e.target;

        const newData = {
            ...deliveryInfo,
            address: {
                ...deliveryInfo.address,
                [name]: value,
            },
        };

        setDeliveryInfo(newData);
    };

    const handlePurchase = async () => {
        try {
            const res = await request.post('/purchase', {
                orderDetails: orderDetails,
                deliveryInfo: deliveryInfo,
                userID: user ? user.userID : null,
            });

            setOrder(res.data.order);
            setMessage([res.data.message]);

            if (res.data.order) {
                setStep(4);
            } else {
                setPopup(true);
            }
        } catch (err) {
            setOrder(null);
            setPopup(true);
            setMessage(['Error while purchasing! Please try again later']);
            console.log(err);
        }
    };

    const handlePaymentMethod = async (e) => {
        e.preventDefault();
        if (orderDetails.paymentMethod === 'COD') {
            await handlePurchase();
        } else {
            setStep(3);
        }
    };

    const fetchUserInfo = async () => {
        try {
            const res = await request.get('/users/search', { params: { _id: user.userID } });

            const userDetail = res.data.users ? res.data.users[0] : null;

            const delivery = userDetail
                ? {
                      name: userDetail.name,
                      address: userDetail.address
                          ? userDetail.address
                          : {
                                city: '',
                                district: '',
                                ward: '',
                                housenumber: '',
                            },
                      phoneNumber: userDetail.phonenumber,
                      email: userDetail.gmail ? userDetail.gmail : '',
                  }
                : {
                      name: '',
                      address: {
                          city: '',
                          district: '',
                          ward: '',
                          housenumber: '',
                      },
                      phoneNumber: '',
                      email: '',
                  };
            setDeliveryInfo(delivery);
        } catch (err) {
            setDeliveryInfo({
                name: '',
                address: {
                    city: '',
                    district: '',
                    ward: '',
                    housenumber: '',
                },
                phoneNumber: '',
                email: '',
            });
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await request.get('/getCartDetails');

            setOrderDetails({ ...orderDetails, products: res.data.products });
        } catch (err) {
            setOrderDetails({});
        }
    };

    useEffect(() => {
        const total = orderDetails.products.reduce(
            (value, product) => value + product.productPrice * product.quantity,
            0,
        );
        setOrderDetails({ ...orderDetails, total: total });
    }, [orderDetails.products]);

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
            {popup && (
                <PopupMessage header={'Purchase failed!'} messageRow={message} callback={() => setPopup(false)} />
            )}

            <span className={cx('page-path')}>
                Shopping cart / <b>Delivery Information </b>
            </span>

            <div className={cx('container')}>
                {step === 1 && (
                    <div className={cx('user-info')}>
                        <span className={cx('form-header')}>Delivery information</span>
                        {user ? (
                            <span className={cx('user')}>
                                <FontAwesomeIcon icon={faUser} />
                                <span className={cx('user-info-label')}>
                                    {' '}
                                    {deliveryInfo.name} - {deliveryInfo.email}
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

                        <form
                            className={cx('information-form')}
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleChangeStep(2);
                            }}
                        >
                            <div className={cx('form-row')}>
                                <input
                                    className={cx('form-input', 'half')}
                                    placeholder="Your name: "
                                    readOnly={user}
                                    value={deliveryInfo.name}
                                    name="name"
                                    onChange={handleChangeData}
                                    required
                                />
                                <input
                                    className={cx('form-input', 'half')}
                                    placeholder="Phone number: "
                                    name="phoneNumber"
                                    value={deliveryInfo.phoneNumber}
                                    onChange={handleChangeData}
                                    required
                                />
                            </div>
                            <div className={cx('form-row')}>
                                <input
                                    className={cx('form-input', 'full')}
                                    placeholder="Email: "
                                    readOnly={user}
                                    name="email"
                                    value={deliveryInfo.email}
                                    onChange={handleChangeData}
                                    required
                                />
                            </div>

                            <div className={cx('form-field')}>
                                <input
                                    className={cx('form-input', 'full')}
                                    value={deliveryInfo.address.housenumber}
                                    name="housenumber"
                                    placeholder="Address"
                                    onChange={handleChangeSubData}
                                    required
                                />
                                <input
                                    className={cx('form-input', 'third')}
                                    value={deliveryInfo.address.city}
                                    name="city"
                                    placeholder="City/Province"
                                    onChange={handleChangeSubData}
                                    required
                                />
                                <input
                                    className={cx('form-input', 'third')}
                                    value={deliveryInfo.address.district}
                                    name="district"
                                    placeholder="District"
                                    onChange={handleChangeSubData}
                                    required
                                />
                                <input
                                    className={cx('form-input', 'third')}
                                    value={deliveryInfo.address.ward}
                                    name="ward"
                                    placeholder="Ward"
                                    onChange={handleChangeSubData}
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
                                    value="COD"
                                    onChange={(e) =>
                                        setOrderDetails((prev) => ({ ...prev, paymentMethod: e.target.value }))
                                    }
                                    required
                                />
                                <span className={cx('payment-type')}>Pay on delivery (COD)</span>
                            </div>
                            <div className={cx('form-input', 'full', 'payment-choice')}>
                                <input
                                    type="radio"
                                    name="payment-method"
                                    value="ATM"
                                    onChange={(e) =>
                                        setOrderDetails((prev) => ({ ...prev, paymentMethod: e.target.value }))
                                    }
                                    required
                                />
                                <span className={cx('payment-type')}>ATM</span>
                            </div>
                        </div>
                        <div className={cx('form-actions')}>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleChangeStep(1);
                                }}
                                className={cx('submit-btn')}
                            >
                                Back to Delivery Information
                            </button>

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
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleChangeStep(2);
                                    }}
                                    className={cx('submit-btn')}
                                >
                                    Cancel
                                </button>

                                <button type="submit" className={cx('submit-btn')}>
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 4 && order && (
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

                            <span className={cx('order-row')}>Name: {deliveryInfo.name}</span>
                            <span className={cx('order-row')}>Phone: {deliveryInfo.phoneNumber}</span>
                            <span className={cx('order-row')}>
                                Address: {deliveryInfo.address.housenumber}, ward {deliveryInfo.address.ward}, district{' '}
                                {deliveryInfo.address.district}, {deliveryInfo.address.city}
                            </span>

                            <span className={cx('order-header')}>Payment method</span>
                            <span className={cx('order-row')}>{orderDetails.paymentMethod}</span>
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
                    {orderDetails.products.map((product, index) => (
                        <div key={index} className={cx('product')}>
                            <div className={cx('product-info')}>
                                <img src={product.avatar} className={cx('product-image')} />
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
                                {orderDetails.total.toLocaleString('it-IT', {
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
                            {orderDetails.total.toLocaleString('it-IT', {
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
