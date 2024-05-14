import classNames from 'classnames/bind';

import styles from './Authentication.module.scss';

import images from '../../assets/images';

const cx = classNames.bind(styles);

function Authentication({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <b>Free Delivery</b>: Take advance of our time to save event | <b>Free returns *</b> Satisfaction
                guaranteed
            </div>
            <img src={images.logo} className={cx('logo-image')} alt="Background Image"></img>
            <img className={cx('background-image')} src={images.background}></img>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default Authentication;
