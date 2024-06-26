import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './NavBar.module.scss';

import images from '../../assets/images';
import SearchBar from '../SearchBar';
import UserPopper from '../../poppers/UserPopper';
import PerfumeCategoryPopper from '../../poppers/PerfumeCategoryPopper';

const cx = classNames.bind(styles);

function NavBar() {
    const [selected, setSelected] = useState('');

    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setSelected('home');
                break;
            case '/perfume':
                setSelected('perfume');
                break;
            case '/about':
                setSelected('about');
                break;
            case '/blog':
                setSelected('blog');
                break;
            case '/contact':
                setSelected('contact');
                break;
            default:
                break;
        }
    }, [location]);

    return (
        <div className={cx('wrapper')}>
            <Link to="/">
                <img src={images.logo} alt="logo" className={cx('logo-image')}></img>
            </Link>

            <SearchBar />

            <div className={cx('actions')}>
                <UserPopper>
                    <button className={cx('action-btn')}>
                        <span className={cx('action-icon')}>
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        Account
                        <span className={cx('action-icon')}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                    </button>
                </UserPopper>
                <Link to="/cart" className={cx('action-btn')}>
                    <span className={cx('action-icon')}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </span>
                    Cart
                </Link>
            </div>

            <div className={cx('link-list')}>
                <Link to="/" className={cx('link-item', { selected: selected === 'home' })}>
                    Home
                </Link>

                <PerfumeCategoryPopper>
                    <span className={cx('link-item', { selected: selected === 'perfume' })}>
                        Perfume
                        <span className={cx('link-icon')}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                    </span>
                </PerfumeCategoryPopper>

                <Link to="/about" className={cx('link-item', { selected: selected === 'about' })}>
                    About us
                </Link>
                <Link to="/blog" className={cx('link-item', { selected: selected === 'blog' })}>
                    Blog
                </Link>
                <Link to="/contact" className={cx('link-item', { selected: selected === 'contact' })}>
                    Contact us
                </Link>
            </div>
        </div>
    );
}

export default NavBar;
