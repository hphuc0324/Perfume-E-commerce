import Authentication from '../Authentication';

import classNames from 'classnames/bind';

import styles from './SignUp.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SignUp() {
    const [account, setAccount] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [checked, setChecked] = useState(false);

    return (
        <Authentication>
            <div className={cx('wrapper')}>
                <span className={cx('form-header')}>REGISTER</span>
                <form className={cx('signup-form')}>
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
                        <label className={cx('form-label')}>Your Name</label>
                        <input
                            className={cx('form-input')}
                            placeholder="Enter your name......"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={cx('form-field')}>
                        <label className={cx('form-label')}>Your Phone Number</label>
                        <input
                            className={cx('form-input')}
                            type="password"
                            placeholder="Enter your name..."
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                            <option value="femlae">Female</option>
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

export default SignUp;
