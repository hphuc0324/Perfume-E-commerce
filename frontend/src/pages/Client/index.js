import classNames from 'classnames/bind';

import styles from './Client.module.scss';
import { useEffect, useState } from 'react';
import request from '../../utils/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Client() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await request.get('/getAllUsers');

            setUsers(res.data.users);
        } catch (err) {
            setUsers([]);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('table-header')}>CLIENTS</div>
            <div className={cx('data-table')}>
                <div className={cx('data-row')}>
                    <span className={cx('data-col', 'index-col', 'header')}>Index</span>
                    <span className={cx('data-col', 'header')}>Name</span>
                    <span className={cx('data-col', 'header')}>Email</span>
                    <span className={cx('data-col', 'header')}>Gender</span>
                    <span className={cx('data-col', 'header')}>Phone number</span>
                    <span className={cx('data-col', 'header')}>Status</span>
                    <span className={cx('data-col', 'last-col', 'header')}>Operation</span>
                </div>
                {users &&
                    users.map((user, index) => (
                        <div key={index} className={cx('data-row')}>
                            <span className={cx('data-col', 'index-col')}>{index}</span>
                            <span className={cx('data-col')}>{user.name}</span>
                            <span className={cx('data-col')}>{user.email || 'Not submitted'}</span>
                            <span className={cx('data-col')}>{user.gender}</span>
                            <span className={cx('data-col')}>{user.phonenumber}</span>
                            <span className={cx('data-col')}>{user.status}</span>
                            <span className={cx('data-col', 'last-col')}>
                                {user.status === 'available' ? (
                                    <FontAwesomeIcon icon={faLock} />
                                ) : (
                                    <FontAwesomeIcon icon={faUnlock} />
                                )}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Client;
