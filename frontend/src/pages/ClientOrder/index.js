import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import styles from './ClientOrder.module.scss';
import request from '../../utils/request';

import UserContext from '../../context/userContext';

const cx = classNames.bind(styles);

function ClientOrder() {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(UserContext);
    const [mapped, setMapped] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await request.get('/orders/search', { params: { userID: user.userID } });

            setOrders(res.data.orders);
        } catch (err) {
            setOrders([]);
        }
    };

    const fetchOrdersDetails = async (req, res) => {
        if (orders.length === 0) {
            return;
        }

        try {
            const res = await request.get('/getOrdersDetails', {
                params: {
                    idList: orders.map((order) => {
                        return {
                            orderID: order._id,
                            productsID: order.products.map((p) => p.productID),
                        };
                    }),
                },
            });

            const data = res.data.ordersDetails;
            const mapped = orders.map((order) => {
                const orderDetails = data.find((d) => d.orderID.toString() === order._id.toString());

                return {
                    ...order,
                    products: orderDetails.products.map((product, index) => {
                        return {
                            ...product,
                            quantity: order.products[index].quantity,
                        };
                    }),
                };
            });

            setMapped(mapped);
        } catch (err) {}
    };

    console.log(mapped);

    useEffect(() => {
        fetchOrders();
    }, [user]);

    useEffect(() => {
        fetchOrdersDetails();
    }, [orders]);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('page-path')}>
                <Link className={cx('redirect-path')} to="/profile">
                    Profile
                </Link>{' '}
                / <b>Orders</b>
            </span>
            <h2 className={cx('header')}>Orders</h2>
            {orders.length === 0 ? (
                <div className={cx('no-orders-section')}>
                    <span className={cx('banner')}>You have paid any others yet! Let's go shopping!</span>
                    <Link to="/perfume" className={cx('no-products-btn')}>
                        Continue to shopping
                    </Link>
                </div>
            ) : (
                <div className={cx('orders-section')}>
                    <div className={cx('order-row')}>
                        <div className={cx('col-10', 'row-header')}>Order ID</div>
                        <div className={cx('col-30', 'row-header')}>Products</div>
                        <div className={cx('col-10', 'row-header')}>Date</div>
                        <div className={cx('col-15', 'row-header')}>Transport Status</div>
                        <div className={cx('col-15', 'row-header')}>Payment method</div>
                        <div className={cx('col-10', 'row-header')}>Total payment</div>
                        {/* <button className={cx('col-5')}>Confirm have receive order</button> */}
                    </div>

                    {mapped.map((order, index) => (
                        <div key={index} className={cx('order-row')}>
                            <div className={cx('col-10')}>{order._id.slice(0, 10)}</div>
                            <div className={cx('col-30', 'products')}>
                                {order.products.map((product, p_index) => (
                                    <div key={p_index} className={cx('product')}>
                                        <img src={product.avatar} className={cx('product-avatar')} />
                                        <div className={cx('product-info')}>
                                            <span className={cx('product-name')}>{product.name}</span>
                                            <span className={cx('product-quantity')}>x{product.quantity}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={cx('col-10')}>{new Date(order.date).toLocaleDateString()}</div>
                            <div className={cx('col-15', 'capitalized')}>{order.transportstatus}</div>
                            <div className={cx('col-15')}>{order.paymentmethod}</div>
                            <div className={cx('col-10')}>
                                {order.total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ClientOrder;
