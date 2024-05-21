import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Authentication from '../Authentication';

import classNames from 'classnames/bind';

import styles from './SignUp.module.scss';
import request from '../../utils/request';
import UserContext from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const textFormat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

function SignUp() {
    const [account, setAccount] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('male');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log('in');
        e.preventDefault();
        if (!validateData()) {
            return;
        }

        try {
            const res = await request.post('/register', {
                account: account,
                password: password,
                name: name,
                phonenumber: phoneNumber,
                gender: gender,
            });

            setErrorMessage(res.data.message);

            if (res.data.message === '') {
                setUser(res.data.user);
                navigate('/');
            }
        } catch (err) {}
    };

    const validateData = () => {
        if (account === '') {
            return false;
        } else if (account.length < 4 || account.length > 20) {
            setErrorMessage('account must be between 4 and 20 characters');
            return false;
        } else if (textFormat.test(account)) {
            setErrorMessage('Username must not contains special characters');
            return false;
        } else if (textFormat.test(password)) {
            setErrorMessage('Password must not contains special characters');
            return false;
        } else if (password !== repassword) {
            setErrorMessage('Password mismatch!');
            return false;
        } else if (/^\d+$/.test(phoneNumber) === false) {
            setErrorMessage('Phone number must contains digit characters!');
            return false;
        } else if (!checked) {
            setErrorMessage('You must agree to the terms and conditions');
            return false;
        }

        return true;
    };

    return (
        <Authentication>
            <div className={cx('wrapper')}>
                <span className={cx('form-header')}>REGISTER</span>
                <form className={cx('signup-form')} method="POST" onSubmit={handleSubmit}>
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
                        <label className={cx('form-label')}>Your Name</label>
                        <input
                            className={cx('form-input')}
                            placeholder="Enter your name......"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={cx('form-field')}>
                        <label className={cx('form-label')}>Your Phone Number</label>
                        <input
                            className={cx('form-input')}
                            placeholder="Enter your name..."
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div className={cx('form-field')}>
                        <label className={cx('form-label')}>Your Gender</label>
                        <select
                            className={cx('form-input')}
                            placeholder="Enter your address..."
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
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

                    <div className={cx('form-field')}>
                        <label className={cx('form-label')}>Confirm Password</label>
                        <input
                            className={cx('form-input')}
                            type="password"
                            placeholder="Confirm your password..."
                            value={repassword}
                            onChange={(e) => setRepassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={cx('form-check')}>
                        <input
                            className={cx('form-checkbox')}
                            type="checkbox"
                            value={checked}
                            onChange={() => {
                                setChecked((prev) => !prev);
                            }}
                        />
                        <label className={cx('form-label')}>Agree to receive notifications from our website</label>
                    </div>

                    <span className={cx('error-message')}>{errorMessage}</span>
                    <button type="submit" className={cx('submit-btn')}>
                        Register
                    </button>
                    <div className={cx('others')}>
                        <span className={cx('other-item')}>Already have an account?</span>
                        <Link to="/login" className={cx('other-item')}>
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </Authentication>
    );
}

export default SignUp;
