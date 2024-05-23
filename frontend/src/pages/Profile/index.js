import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-regular-svg-icons';
import { faCubes, faNewspaper } from '@fortawesome/free-solid-svg-icons';

import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('page-path')}>
                Home / <b>Profile</b>
            </span>

            <div className={cx('user-tabs')}>
                <Link to="/profile/information" className={cx('user-tab')}>
                    <span className={cx('tab-icon')}>
                        <FontAwesomeIcon icon={faIdCard} />
                    </span>
                    <span className={cx('tab-header')}>Information</span>
                    <span className={cx('tab-detail')}>Provide personal details and how we can reach you</span>
                </Link>
                <Link to="/profile/orders" className={cx('user-tab')}>
                    <span className={cx('tab-icon')}>
                        <FontAwesomeIcon icon={faCubes} />
                    </span>
                    <span className={cx('tab-header')}>Orders</span>
                    <span className={cx('tab-detail')}>See your orders' detail</span>
                </Link>
                <Link className={cx('user-tab')}>
                    <span className={cx('tab-icon')}>
                        <FontAwesomeIcon icon={faNewspaper} />
                    </span>
                    <span className={cx('tab-header')}>Blogs</span>
                    <span className={cx('tab-detail')}>You can find your previous blogs for our platform here</span>
                </Link>
            </div>
        </div>
    );
}

export default Profile;
