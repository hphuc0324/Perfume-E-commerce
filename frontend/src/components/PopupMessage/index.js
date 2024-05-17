import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import styles from './PopupMessage.module.scss';
import images from '../../assets/images';

const cx = classNames.bind(styles);

function PopupMessage({ image = null, header, messageRow, callback }) {
    const handlePropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={cx('wrapper')} onClick={handlePropagation}>
            <div className={cx('container')}>
                {image && (
                    <img
                        src="https://res.cloudinary.com/cloudinary-hphucc0324/image/upload/v1715963652/test/ea1111ibur0mxlswiiji.png"
                        alt="image-notification"
                        className={cx('noti-image')}
                    />
                )}
                <div className={cx('content')}>
                    <span className={cx('message-header')}>{header}</span>
                    {messageRow.length > 0 &&
                        messageRow.map((row, index) => (
                            <span key={index} className={cx('message-row')}>
                                {row}
                            </span>
                        ))}
                </div>

                <button className={cx('close-btn')} onClick={callback}>
                    <FontAwesomeIcon icon={faX} />
                </button>
            </div>
        </div>
    );
}

export default PopupMessage;
