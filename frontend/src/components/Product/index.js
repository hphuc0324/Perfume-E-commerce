import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import styles from './Product.module.scss';
import images from '../../assets/images';

const cx = classNames.bind(styles);

function Product({ product, horizontal = false }) {
    return (
        <div className={cx('wrapper', { horizontal: horizontal })}>
            <img src={images.about} alt="product image" className={cx('product-image')} />

            <div className={cx('product-info')}>
                <span className={cx('product-name')}>{product.name}</span>
                <span className={cx('product-price')}>
                    {product.discount === 0
                        ? product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                        : (product.price - (product.price * product.discount) / 100).toLocaleString('it-IT', {
                              style: 'currency',
                              currency: 'VND',
                          })}
                </span>
                {product.discount !== 0 && (
                    <span className={cx('product-old-price')}>
                        ({product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })})
                    </span>
                )}

                <button className={cx('addToCart-btn')}>
                    <FontAwesomeIcon icon={faCartShopping} />
                </button>
            </div>
            {product.discount !== 0 && <div className={cx('discount-tag')}>-{product.discount}%</div>}
        </div>
    );
}

export default Product;
