import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';

import images from '../../assets/images';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('images')}>
                <img className={cx('full-width-image')} src={images.home[0]} alt="image" />
                <img className={cx('half-width-image')} src={images.home[1]} alt="image" />
                <img className={cx('half-width-image')} src={images.home[2]} alt="image" />
            </div>

            <div className={cx('section')}>
                <div className={cx('section-info')}>
                    <span className={cx('section-header')}>Flashsale products</span>
                    <span className={cx('section-description')}>Impressive and best-selling product</span>
                </div>

                <Link className={cx('see-more-btn')} to="">
                    SEE MORE
                </Link>
            </div>

            <div className={cx('images')}>
                <img className={cx('half-width-image')} src={images.home[3]} />
                <img className={cx('half-width-image')} src={images.home[4]} />
            </div>

            <div className={cx('section')}>
                <div className={cx('section-info')}>
                    <span className={cx('section-header')}>Our products</span>
                    <span className={cx('section-description')}>Diverse and newest products</span>
                </div>

                <Link className={cx('see-more-btn')} to="">
                    SEE MORE
                </Link>
            </div>
        </div>
    );
}

export default Home;
