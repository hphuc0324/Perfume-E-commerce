import classNames from 'classnames/bind';

import styles from './AdminNavbar.module.scss';
import { Link } from 'react-router-dom';

import images from '../../assets/images';
import { useState, useContext } from 'react';
import request from '../../utils/request';
import UserContext from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AdminNavbar() {
    const [selected, setSelected] = useState(1);
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await request.get('/logout');
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
        }

        navigate('/');
    };

    return (
        <div className={cx('wrapper')}>
            <img className={cx('logo')} src={images.logo} />

            <Link className={cx('nav-item', { selected: selected === 1 })} onClick={() => setSelected(1)}>
                DashBoard
            </Link>
            <Link
                to="/admin/order"
                className={cx('nav-item', { selected: selected === 2 })}
                onClick={() => setSelected(2)}
            >
                Orders
            </Link>
            <Link
                to="/admin/client"
                className={cx('nav-item', { selected: selected === 3 })}
                onClick={() => setSelected(3)}
            >
                Clients
            </Link>

            <Link className={cx('nav-item', { selected: selected === 4 })} onClick={() => setSelected(4)}>
                Blogs
            </Link>
            <Link
                to="/admin/products"
                className={cx('nav-item', { selected: selected === 5 })}
                onClick={() => setSelected(5)}
            >
                Product
            </Link>
            <button onClick={handleLogout} className={cx('nav-item')}>
                Log out
            </button>
        </div>
    );
}

export default AdminNavbar;
