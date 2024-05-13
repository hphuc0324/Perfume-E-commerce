import Authentication from '../Authentication';

import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Login() {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Authentication>
            <div className={cx('wrapper')}>
                <span className={cx('form-header')}>LOGIN</span>
                <form className={cx('login-form')}>
                    <div className={cx('form-field')}>
                        <label className={cx('form-label')}>Account</label>
                        <input
                            className={cx('form-input')}
                            placeholder="Enter your email or phone number..."
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                        />
                    </div>

                    <div className={cx('form-field')}>
                        <label className={cx('form-label')}>Password</label>
                        <input
                            className={cx('form-input')}
                            type="password"
                            placeholder="Enter your password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className={cx('submit-btn')}>Login</button>
                    <div className={cx('others')}>
                        <span className={cx('other-item')}>Don't have an account?</span>
                        <span className={cx('other-item')}>Sign Up</span>
                    </div>
                </form>
            </div>
        </Authentication>
    );
}

export default Login;
