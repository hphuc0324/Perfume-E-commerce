import classNames from 'classnames/bind';

import styles from './UserPopper.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import Wrapper from '../Wrapper';
import UserContext from '../../context/userContext';
import { useContext } from 'react';
import request from '../../utils/request';

const cx = classNames.bind(styles);

function UserPopper({ children }) {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            const res = await request.get('/logout');
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
        }
    };

    return (
        <Tippy
            trigger="click"
            placement="bottom-end"
            interactive
            render={(attrs) => (
                <div className={cx('wrapper')} {...attrs}>
                    {!user && (
                        <Wrapper classnames={cx('user-wrapper')}>
                            <Link className={cx('item')} to={'/login'}>
                                Login
                            </Link>
                            <Link className={cx('item')} to={'/register'}>
                                Register
                            </Link>
                        </Wrapper>
                    )}

                    {user && (
                        <Wrapper classnames={cx('user-wrapper')}>
                            <Link className={cx('item')} to={'/profile'}>
                                View profile
                            </Link>
                            <button className={cx('item', 'logout-btn')} onClick={handleLogout}>
                                Log out
                            </button>
                        </Wrapper>
                    )}
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default UserPopper;
