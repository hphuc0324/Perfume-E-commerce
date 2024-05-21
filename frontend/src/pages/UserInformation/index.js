import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faEye, faUnlock } from '@fortawesome/free-solid-svg-icons';

import styles from './UserInformation.module.scss';
import request from '../../utils/request';
import PopupMessage from '../../components/PopupMessage';

const cx = classNames.bind(styles);

function UserInformation() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phonenumber: '',
        gender: '',
        address: {
            city: '',
            district: '',
            ward: '',
            housenumber: '',
        },
    });

    const [initialData, setInitialData] = useState({
        name: '',
        email: '',
        phonenumber: '',
        gender: '',
        address: {
            city: '',
            district: '',
            ward: '',
            housenumber: '',
        },
    });

    const [popup, setPopup] = useState(false);

    const [messages, setMessages] = useState([]);
    const [header, setHeader] = useState('');

    const fetchData = async () => {
        try {
            const res = await request.get('/getUserInfo');
            const user = res.data.user;
            if (user) {
                const userInfo = {
                    name: user.name,
                    email: user.gmail ? user.gmail : '',
                    phonenumber: user.phonenumber,
                    gender: user.gender,
                    address: user.address
                        ? {
                              city: user.address.city,
                              district: user.address.district,
                              ward: user.address.ward,
                              housenumber: user.address.housenumber,
                          }
                        : {
                              city: '',
                              district: '',
                              ward: '',
                              housenumber: '',
                          },
                };

                setInitialData(userInfo);
                setFormData(userInfo);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChangeData = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleChangeSubData = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'housenumber':
                setFormData({
                    ...formData,
                    address: {
                        ...formData.address,
                        housenumber: value,
                    },
                });
                break;
            case 'ward':
                setFormData({
                    ...formData,
                    address: {
                        ...formData.address,
                        ward: value,
                    },
                });
                break;
            case 'district':
                setFormData({
                    ...formData,
                    address: {
                        ...formData.address,
                        district: value,
                    },
                });
                break;
            case 'city':
                setFormData({
                    ...formData,
                    address: {
                        ...formData.address,
                        city: value,
                    },
                });
                break;
            default:
                break;
        }
    };

    const handleCheckDataChange = () => {
        return JSON.stringify(formData) === JSON.stringify(initialData);
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const res = await request.post('/updateUser', { userInfo: formData });

            setMessages([res.data.message]);

            if (res.data.message === '') {
                setMessages(['Your profile has been updated successfully!']);
                setHeader('Updated successfully!');
            } else {
                setHeader('Update failed!');
            }

            setPopup(true);
        } catch (err) {
            setHeader('Update failed!');
            setMessages(['An error occurred while updating! Please try again']);
            setPopup(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {popup && <PopupMessage header={header} messageRow={messages} callback={() => setPopup(false)} />}

            <span className={cx('page-path')}>
                <Link to="/profile" className={cx('redirect-path')}>
                    Profile
                </Link>{' '}
                / <b>Information</b>
            </span>

            <div className={cx('content')}>
                <form className={cx('info-form')} method="POST" onSubmit={handleSubmitForm}>
                    <h3 className={cx('header')}>Personal Info</h3>

                    <div className={cx('form-field', 'one-third')}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Fullname"
                            className={cx('form-input')}
                            onChange={handleChangeData}
                        />
                    </div>

                    <div className={cx('form-field', 'one-third')}>
                        <input
                            type="text"
                            name="phonenumber"
                            placeholder="Phone number"
                            value={formData.phonenumber}
                            className={cx('form-input')}
                            onChange={handleChangeData}
                        />
                    </div>

                    <div className={cx('form-field', 'one-third')}>
                        <select
                            type="selection"
                            name="gender"
                            placeholder="Genderr"
                            value={formData.gender}
                            className={cx('form-input')}
                            onChange={handleChangeData}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className={cx('form-field', 'full')}>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            placeholder="Email"
                            className={cx('form-input')}
                            onChange={handleChangeData}
                        />
                    </div>

                    <div className={cx('form-part')}>
                        <div className={cx('form-field', 'full')}>
                            <input
                                type="text"
                                name="housenumber"
                                placeholder="Address - House number"
                                value={formData.address.housenumber}
                                className={cx('form-input')}
                                onChange={handleChangeSubData}
                            />
                        </div>

                        <div className={cx('form-field', 'one-third')}>
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.address.city}
                                className={cx('form-input')}
                                onChange={handleChangeSubData}
                            />
                        </div>

                        <div className={cx('form-field', 'one-third')}>
                            <input
                                type="text"
                                name="district"
                                placeholder="District"
                                value={formData.address.district}
                                className={cx('form-input')}
                                onChange={handleChangeSubData}
                            />
                        </div>

                        <div className={cx('form-field', 'one-third')}>
                            <input
                                type="text"
                                name="ward"
                                placeholder="Ward"
                                value={formData.address.ward}
                                className={cx('form-input')}
                                onChange={handleChangeSubData}
                            />
                        </div>
                    </div>

                    <button className={cx('submit-btn', { disabled: handleCheckDataChange() })}>Save</button>
                </form>

                <div className={cx('policy-section')}>
                    <div className={cx('policy')}>
                        <span className={cx('policy-icon')}>
                            <FontAwesomeIcon icon={faUserLock} />
                        </span>
                        <span className={cx('policy-header')}>Why isn’t my info shown here?</span>
                        <span className={cx('policy-content')}>
                            We’re hiding some account details to protect your identity.
                        </span>
                    </div>

                    <div className={cx('policy')}>
                        <span className={cx('policy-icon')}>
                            <FontAwesomeIcon icon={faUnlock} />
                        </span>
                        <span className={cx('policy-header')}>Which details can be edited?</span>
                        <span className={cx('policy-content')}>Contact info and personal details can be edited.</span>
                    </div>

                    <div className={cx('policy')}>
                        <span className={cx('policy-icon')}>
                            <FontAwesomeIcon icon={faEye} />
                        </span>
                        <span className={cx('policy-header')}>What info is shared with others?</span>
                        <span className={cx('policy-content')}>
                            We only releases contact information for Blogs' Owner and guests after a reservation is
                            confirmed.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInformation;
