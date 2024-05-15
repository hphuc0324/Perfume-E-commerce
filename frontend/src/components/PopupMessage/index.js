import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

import styles from './PopupMessage.module.scss';
import images from '../../assets/images';

const cx = classNames.bind(styles);

function PopupMessage({ image = null, header, messageRow, callback }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {image && <img src={images.about} alt="image-notification" className={cx('noti-image')} />}
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
