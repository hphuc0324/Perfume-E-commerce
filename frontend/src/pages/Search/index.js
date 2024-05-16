import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Search.module.scss';
import request from '../../utils/request';
import Product from '../../components/Product';

const cx = classNames.bind(styles);

function Search() {
    const [results, setResults] = useState([]);
    const [name, setName] = useState('');

    const location = useLocation();

    const handleFetchProduct = async (name) => {
        try {
            const res = await request.get('/products/name', { params: { name: name } });

            setResults(res.data.products);
        } catch (err) {
            setResults([]);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const productName = searchParams.get('name');

        setName(productName);

        handleFetchProduct(productName);
    }, [location.search]);

    return (
        <div className={cx('wrapper')}>
            <span className={cx('page-path')}>
                Home / <b>Find product </b>
            </span>

            <h2 className={cx('search-header')}>Result</h2>
            {results.length === 0 ? (
                <span className={cx('search-description')}>
                    The content you requested was not found "{name}" was not found. Please check your spelling, use more
                    general words, and try again!
                </span>
            ) : (
                <span className={cx('search-description')}>There is {results.length} product for your search</span>
            )}

            {results.length !== 0 && (
                <div className={cx('search-items')}>
                    {results.map((product, index) => (
                        <div className={cx('item')}>
                            <Product product={product} horizontal />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
