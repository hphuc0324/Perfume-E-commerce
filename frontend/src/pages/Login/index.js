import Authentication from '../Authentication';

import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import { useContext, useState } from 'react';
import request from '../../utils/request';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/userContext';

const cx = classNames.bind(styles);

function Login() {
    const { user, setUser } = useContext(UserContext);
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await request.post('/login', {
                username: account,
                password: password,
            });

            setErrorMessage(res.data.message);

            if (res.data.message === '') {
                setUser(res.data.user);
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Authentication>
            <div className={cx('wrapper')}>
                <span className={cx('form-header')}>LOGIN</span>
                <form className={cx('login-form')} method="POST" onSubmit={handleFormSubmit}>
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
                    <span className={cx('error-message')}>{errorMessage}</span>
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
