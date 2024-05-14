import classNames from 'classnames/bind';

import styles from './About.module.scss';
import images from '../../assets/images';

const cx = classNames.bind(styles);

function About() {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('page-path')}>
                Home / <b>About us</b>
            </span>

            <div className={cx('content')}>
                <div className={cx('text-content')}>
                    <h3 className={cx('about-header')}>Welcome To YTVD’S Store!</h3>
                    <span className={cx('section-header')}>Brand philosophy</span>
                    <span className={cx('section-content')}>
                        YTVD'S perfume brand was established, born from the desire to bring a shining scent to each
                        customer. To personalize each individual scent of each product, our store overcomes great
                        challenges in terms of study.
                    </span>
                    <span className={cx('section-header')}>Mission</span>
                    <span className={cx('section-content')}>
                        With the motto "Mastering scent", YTVD'S wants every hangfluoon customer to discover and
                        appreciate the beauty of their own scent, contributing to bringing a meaningful life to half of
                        the world through products and services. high end of the brand.
                    </span>
                </div>

                <img className={cx('about-image')} src={images.about} alt="about"></img>
            </div>
        </div>
    );
}

export default About;
