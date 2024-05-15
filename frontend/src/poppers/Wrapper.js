import classNames from 'classnames/bind';

import styles from './Wrapper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, classnames }) {
    return (
        <div
            className={cx('wrapper', {
                [classnames]: classnames,
            })}
        >
            {children}
        </div>
    );
}

export default Wrapper;
