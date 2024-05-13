import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Footer() {
    const [email, setEmail] = useState('');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('footer-category')}>
                <span className={cx('category-header')}>Home</span>
                <span className={cx('category-item')}>About us</span>
                <span className={cx('category-item')}>Delivery Information</span>
                <span className={cx('category-item')}>Privacy Policy</span>
                <span className={cx('category-item')}>Term & Conditions</span>
                <span className={cx('category-item')}>Contact Us</span>
                <span className={cx('category-item')}>Returns</span>
            </div>

            <div className={cx('footer-category')}>
                <span className={cx('category-header')}>Extras Us</span>
                <span className={cx('category-item')}>Brands</span>
                <span className={cx('category-item')}>Gift Certificates</span>
                <span className={cx('category-item')}>Affiliates</span>
                <span className={cx('category-item')}>Specials</span>
                <span className={cx('category-item')}>Site Map</span>
                <span className={cx('category-item')}>My Account</span>
            </div>

            <div className={cx('footer-category')}>
                <span className={cx('category-header')}>Contact Us</span>
                <span className={cx('category-item')}>Address: </span>
                <span className={cx('category-item')}>Phone: 0921.744.333</span>
                <span className={cx('category-item')}>Email: YTVD@gmail.com</span>
                <div className={cx('icons-placeholder')}>
                    <a className={cx('icon-link')}>
                        <span className={cx('icon-image')}>
                            <FontAwesomeIcon icon={faGoogle} />
                        </span>
                    </a>
                    <a className={cx('icon-link')}>
                        <span className={cx('icon-image')}>
                            <FontAwesomeIcon icon={faYoutube} />
                        </span>
                    </a>
                    <a className={cx('icon-link')}>
                        <span className={cx('icon-image')}>
                            <FontAwesomeIcon icon={faFacebook} />
                        </span>
                    </a>
                </div>
            </div>
            <div className={cx('footer-category')}>
                <span className={cx('category-header')}>Join Our Newsletter Now</span>
                <span className={cx('category-item')}>
                    Exceptional quality. Ethical factories. Sign up to enjoy free U.S. shipping and returns on your
                    first order
                </span>

                <div className={cx('actions')}>
                    <input
                        placeholder="Enter your email address here..."
                        className={cx('email-input')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button className={cx('submit-btn')}>SUBSCRIBE!</button>
                </div>
            </div>
        </div>
    );
}

export default Footer;
