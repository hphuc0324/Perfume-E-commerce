import Carousel from 'react-multi-carousel';
import classNames from 'classnames/bind';

import styles from './HomePageCarousel.module.scss';

import images from '../../assets/images';

const cx = classNames.bind(styles);

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

function HomePageCarousel() {
    return (
        <div className={cx('image-slider')}>
            <Carousel responsive={responsive} showDots>
                <div></div>
            </Carousel>
        </div>
    );
}

export default HomePageCarousel;
