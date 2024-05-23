import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Perfume.module.scss';
import request from '../../utils/request';

import Product from '../../components/Product';

const cx = classNames.bind(styles);

function Perfume() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [scentFilter, setScentFilter] = useState('');

    //Load all products
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await request.get('/products/search');
            setProducts(res.data.products);
        };

        fetchProducts();
    }, []);

    //Filters
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setCategoryFilter(searchParams.get('category') || '');

        let filteredProducts = products;

        if (categoryFilter !== '') {
            if (categoryFilter === 'flashsale') {
                filteredProducts = filteredProducts.filter((product) => product.discount !== 0);
            } else {
                filteredProducts = filteredProducts.filter((product) => product.category === categoryFilter);
            }
        }

        if (brandFilter !== '') {
            filteredProducts = filteredProducts.filter((product) => product.brand === brandFilter);
        }

        if (scentFilter !== '') {
            filteredProducts = filteredProducts.filter((product) => product.scent === scentFilter);
        }

        setFilteredProducts(filteredProducts);
    }, [location.search, products, brandFilter, scentFilter, categoryFilter]);

    console.log(filteredProducts);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('page-path')}>
                Home / <b>Perfume </b>
            </span>
            {categoryFilter !== '' && (
                <span className={cx('page-sub-path')}>
                    / <b>{categoryFilter}</b>
                </span>
            )}
            <div className={cx('content')}>
                <div className={cx('navbar')}>
                    <div className={cx('filter-list')}>
                        <span className={cx('filter-header')}>Category</span>
                        <Link
                            to="/perfume?category=male"
                            className={cx('filter-item', { selected: categoryFilter === 'male' })}
                        >
                            Male
                        </Link>
                        <Link
                            to="/perfume?category=female"
                            className={cx('filter-item', { selected: categoryFilter === 'female' })}
                        >
                            Female
                        </Link>
                        <Link
                            to="/perfume?category=unisex"
                            className={cx('filter-item', { selected: categoryFilter === 'unisex' })}
                        >
                            Unisex
                        </Link>
                    </div>

                    <div className={cx('filter-list')}>
                        <span className={cx('filter-header')}>Brand</span>
                        <button
                            onClick={() => setBrandFilter('YSL')}
                            className={cx('filter-item', { selected: brandFilter === 'YSL' })}
                        >
                            YSL
                        </button>
                        <button
                            onClick={() => setBrandFilter('Bvlgari')}
                            className={cx('filter-item', { selected: brandFilter === 'Bvlgari' })}
                        >
                            Bvlgari
                        </button>
                        <button
                            onClick={() => setBrandFilter('Channel')}
                            className={cx('filter-item', { selected: brandFilter === 'Channel' })}
                        >
                            Channel
                        </button>
                        <button
                            onClick={() => setBrandFilter('Morra')}
                            className={cx('filter-item', { selected: brandFilter === 'Morra' })}
                        >
                            Morra
                        </button>
                        <button
                            onClick={() => setBrandFilter('Narciso')}
                            className={cx('filter-item', { selected: brandFilter === 'Narciso' })}
                        >
                            Narciso
                        </button>
                        <button
                            onClick={() => setBrandFilter('Christian Dior')}
                            className={cx('filter-item', { selected: brandFilter === 'Christian Dior' })}
                        >
                            Christian Dior
                        </button>
                        <button
                            onClick={() => setBrandFilter('')}
                            className={cx('filter-item', { selected: brandFilter === '' })}
                        >
                            All
                        </button>
                    </div>

                    <div className={cx('filter-list')}>
                        <span className={cx('filter-header')}>Scent</span>
                        <button
                            onClick={() => setScentFilter('Amber')}
                            className={cx('filter-item', { selected: scentFilter === 'Amber' })}
                        >
                            Amber
                        </button>
                        <button
                            onClick={() => setScentFilter('Fresh')}
                            className={cx('filter-item', { selected: scentFilter === 'Fresh' })}
                        >
                            Fresh
                        </button>
                        <button
                            onClick={() => setScentFilter('Floral')}
                            className={cx('filter-item', { selected: scentFilter === 'Floral' })}
                        >
                            Floral
                        </button>
                        <button
                            onClick={() => setScentFilter('Woody')}
                            className={cx('filter-item', { selected: scentFilter === 'Woody' })}
                        >
                            Woody
                        </button>
                        <button
                            onClick={() => setScentFilter('Musk')}
                            className={cx('filter-item', { selected: scentFilter === 'Musk' })}
                        >
                            Musk
                        </button>
                        <button
                            onClick={() => setScentFilter('Leather')}
                            className={cx('filter-item', { selected: scentFilter === 'Leather' })}
                        >
                            Leather
                        </button>
                        <button
                            onClick={() => setScentFilter('')}
                            className={cx('filter-item', { selected: scentFilter === '' })}
                        >
                            All
                        </button>
                    </div>
                </div>
                <div className={cx('products')}>
                    {filteredProducts.map((product, index) => (
                        <div key={index} className={cx('product')}>
                            <Product product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Perfume;
