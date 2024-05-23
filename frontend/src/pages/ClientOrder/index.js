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

    const fetchOrders = async () => {
        try {
            const res = await request.get('/orders/search', { params: { userID: user.userID } });

            setOrders(res.data.orders);
        } catch (err) {
            setOrders([]);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user]);

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
                    <div className={cx('')}>Order ID</div>
                    <div className={cx('')}>Products</div>
                    <div className={cx('')}>Date</div>
                    <div className={cx('')}>Transport Status</div>
                    <div className={cx('')}>Payment method</div>
                </div>
            )}
        </div>
    );
}

export default ClientOrder;
