import classNames from 'classnames/bind';

import styles from './AdminLayout.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import Header from '../../components/Header';
import AdminNavbar from '../../components/AdminNavbar';
import images from '../../assets/images';
const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <AdminNavbar />

                <div className={cx('content')}>
                    <div className={cx('user')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faBell} />
                        </span>
                        <span className={cx('welcome')}>Welcome back</span>
                        <div className={cx('account')}>
                            <span className={cx('account-label')}>Account</span>
                            <img className={cx('account-logo')} src={images.logo} />
                        </div>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
