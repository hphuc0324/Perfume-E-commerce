import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import styles from './PerfumeCategoryPopper.module.scss';
import Wrapper from '../Wrapper';

const cx = classNames.bind(styles);

function PerfumeCategoryPopper({ children }) {
    return (
        <Tippy
            interactive
            trigger="click"
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('wrapper')} {...attrs}>
                    <Wrapper classnames={cx('item-list')}>
                        <Link to="/perfume?category=male" className={cx('item')}>
                            Males
                        </Link>
                        <Link to="/perfume?category=female" className={cx('item')}>
                            Females
                        </Link>
                        <Link to="/perfume?category=unisex" className={cx('item')}>
                            Unisex
                        </Link>
                        <Link to="/perfume?category=flashsale" className={cx('item')}>
                            Flashsale
                        </Link>
                        <Link to="/perfume" className={cx('item')}>
                            Total
                        </Link>
                    </Wrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default PerfumeCategoryPopper;
