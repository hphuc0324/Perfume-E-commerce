import classNames from 'classnames/bind';

import styles from './AdminOrder.module.scss';
import { useEffect, useState } from 'react';
import request from '../../utils/request';

const cx = classNames.bind(styles);

function AdminOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await request.get('/orders/search');

                setOrders(res.data.orders);
            } catch (err) {
                setOrders([]);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('table-header')}>PRODUCTS</div>
            <div className={cx('data-table')}>
                <div className={cx('data-row')}>
                    <span className={cx('data-col', 'index-col', 'header')}>Index</span>
                    <span className={cx('data-col', 'header')}>User ID</span>
                    <span className={cx('data-col', 'header')}>Phonenumber</span>
                    <span className={cx('data-col', 'header')}>Payment Method</span>
                    <span className={cx('data-col', 'header')}>Date</span>
                    <span className={cx('data-col', 'header')}>Status</span>
                </div>
                {orders &&
                    orders.map((order, index) => (
                        <div key={index} className={cx('data-row')}>
                            <span className={cx('data-col', 'index-col')}>{index}</span>
                            <span className={cx('data-col')}>
                                {order.userID ? order.userID.slice(0, 10) : 'Guests'}
                            </span>
                            <span className={cx('data-col')}>{order.phonenumber}</span>
                            <span className={cx('data-col')}>{order.paymentmethod}</span>
                            <span className={cx('data-col')}>{new Date(order.date).toLocaleDateString()}</span>
                            <span className={cx('data-col')}>{order.transportstatus}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default AdminOrder;
