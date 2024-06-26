import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Authentication from '../Authentication';

import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import request from '../../utils/request';
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
                if (res.data.user.role === 'user') {
                    navigate('/');
                } else {
                    navigate('/admin/product');
                }
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
                            required
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
                            required
                        />
                    </div>
                    <span className={cx('error-message')}>{errorMessage}</span>
                    <button className={cx('submit-btn')} type="submit">
                        Login
                    </button>
                    <div className={cx('others')}>
                        <span className={cx('other-item')}>Don't have an account?</span>
                        <Link to="/register" className={cx('other-item')}>
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </Authentication>
    );
}

export default Login;
