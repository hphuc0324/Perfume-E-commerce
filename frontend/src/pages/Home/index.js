import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './Home.module.scss';

import images from '../../assets/images';
import request from '../../utils/request';
import Product from '../../components/Product';

const cx = classNames.bind(styles);

function Home() {
    const [flashsale, setFlashSale] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await request.get('/products');
                const data = res.data.products;
                setProducts(data.filter((product) => product.discount === 0).slice(0, 4));
                setFlashSale(data.filter((product) => product.discount !== 0).slice(0, 3));
            } catch (err) {
                setProducts([]);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('images')}>
                <img className={cx('full-width-image')} src={images.home[0]} alt="image" />
                <img className={cx('half-width-image')} src={images.home[1]} alt="image" />
                <img className={cx('half-width-image')} src={images.home[2]} alt="image" />
            </div>

            <div className={cx('section')}>
                <div className={cx('section-info')}>
                    <span className={cx('section-header')}>Flashsale products</span>
                    <span className={cx('section-description')}>Impressive and best-selling product</span>
                </div>

                <div className={cx('flashsale-section')}>
                    {flashsale.map((product, index) => (
                        <div key={index} className={cx('flashsale-product')}>
                            <Product product={product} />
                        </div>
                    ))}
                </div>

                <Link className={cx('see-more-btn')} to="/perfume?category=flashsale">
                    SEE MORE
                </Link>
            </div>

            <div className={cx('images')}>
                <img className={cx('half-width-image')} src={images.home[3]} />
                <img className={cx('half-width-image')} src={images.home[4]} />
            </div>

            <div className={cx('section')}>
                <div className={cx('section-info')}>
                    <span className={cx('section-header')}>Our products</span>
                    <span className={cx('section-description')}>Diverse and newest products</span>
                </div>

                <div className={cx('other-section')}>
                    {products.map((product, index) => (
                        <div key={index} className={cx('other-product')}>
                            <Product product={product} />
                        </div>
                    ))}
                </div>

                <Link className={cx('see-more-btn')} to="/perfume">
                    SEE MORE
                </Link>
            </div>
        </div>
    );
}

export default Home;
