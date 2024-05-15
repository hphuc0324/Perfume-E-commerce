import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Contact.module.scss';
import images from '../../assets/images';
import PopupMessage from '../../components/PopupMessage';
import request from '../../utils/request';

const cx = classNames.bind(styles);

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [popup, setPopup] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await request.post('/contact', {
                name: name,
                email: email,
                subject: subject,
                message: message,
            });

            setErrorMessage(res.data.message);

            if (res.data.message === '') {
                setPopup(true);
            }
        } catch (err) {}
    };

    return (
        <div className={cx('wrapper')}>
            <span className={cx('page-path')}>
                Home / <b>Contact us</b>
            </span>

            <div className={cx('content')}>
                <div className={cx('text-content')}>
                    <span className={cx('section-content')}>
                        YTVD's customer care service not only supports customers when problems arise, but also listens
                        and absorbs customer feedback. Just contact us, we are ready to assist you!
                    </span>
                    <span className={cx('section-content')}>
                        Building:
                        <br></br>
                        Email: YTDV@gmail.com
                        <br></br>Hotline: 0921.744.333
                        <br></br>Fanpage: facebook.com/YTDVPerfum
                    </span>
                </div>

                <img className={cx('contact-image')} src={images.contact} alt="contact"></img>
            </div>

            <h3>
                <i>DO YOU NEED SUPPORT? PLEASE SEND US INFORMATION</i>
            </h3>

            <span className={cx('error-message')}>{errorMessage}</span>

            <form className={cx('contact-form')} method="POST" onSubmit={handleSubmit}>
                <div className={cx('form-field')}>
                    <label className={cx('form-label')}>Your Name</label>
                    <input
                        className={cx('form-input')}
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={cx('form-field')}>
                    <label className={cx('form-label')}>Your Email</label>
                    <input
                        className={cx('form-input')}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={cx('form-field')}>
                    <label className={cx('form-label')}>Subject</label>
                    <input
                        className={cx('form-input')}
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>

                <div className={cx('form-field')}>
                    <label className={cx('form-label')}>Your Message</label>
                    <textarea
                        className={cx('form-input', 'large')}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <button type="submit" className={cx('submit-btn')}>
                    Submit
                </button>
            </form>

            {popup && (
                <PopupMessage
                    header={'Send contact sucessfully'}
                    messageRow={['Thank you for your response']}
                    callback={() => setPopup(false)}
                />
            )}
        </div>
    );
}

export default Contact;
