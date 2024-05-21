import classNames from 'classnames/bind';

import styles from './AdminProduct.module.scss';
import { useEffect, useState } from 'react';
import request from '../../utils/request';

const cx = classNames.bind(styles);

function AdminProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await request.get('/products');

                setProducts(res.data.products);
            } catch (err) {
                setProducts([]);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('table-header')}>PRODUCTS</div>
            <div className={cx('data-table')}>
                <div className={cx('data-row')}>
                    <span className={cx('data-col', 'index-col', 'header')}>Index</span>
                    <span className={cx('data-col', 'header')}>Product Name</span>
                    <span className={cx('data-col', 'header')}>Brand</span>
                    <span className={cx('data-col', 'header')}>Amount</span>
                    <span className={cx('data-col', 'header')}>Price</span>
                    <span className={cx('data-col', 'header')}>Scent</span>
                    <span className={cx('data-col', 'last-col', 'header')}>Category</span>
                </div>
                {products &&
                    products.map((product, index) => (
                        <div key={index} className={cx('data-row')}>
                            <span className={cx('data-col', 'index-col')}>{index}</span>
                            <span className={cx('data-col')}>{product.name}</span>
                            <span className={cx('data-col')}>{product.brand}</span>
                            <span className={cx('data-col')}>{product.amount}</span>
                            <span className={cx('data-col')}>{product.price}</span>
                            <span className={cx('data-col')}>{product.scent}</span>
                            <span className={cx('data-col', 'last-col')}>{product.category}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default AdminProduct;
