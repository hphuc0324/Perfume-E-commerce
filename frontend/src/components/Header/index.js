import classNames from 'classnames/bind';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return <div className={cx('wrapper')}>The leading genuine perfume distribution system in Vietnam</div>;
}

export default Header;
