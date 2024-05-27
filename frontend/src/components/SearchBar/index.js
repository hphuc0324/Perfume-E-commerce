import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import SearchPopper from '../../poppers/SearchPopper';

import styles from './SearchBar.module.scss';
import request from '../../utils/request';

const cx = classNames.bind(styles);

const item = [
    {
        name: 'Product 1',
    },
    {
        name: 'Product 2',
    },
    {
        name: 'Product 3',
    },
];

function SearchBar() {
    const [searchText, setSearchText] = useState('');
    const searchTextDebounce = useDebounce(searchText, 400);
    const [itemList, setItemList] = useState([]);
    const navigate = useNavigate();

    const handleSearchClick = (e) => {
        e.preventDefault();

        if (searchTextDebounce.trim().length === 0) {
            return;
        }
        navigate(`/search?name=${searchTextDebounce}`);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick(e);
        }
    };

    useEffect(() => {
        if (searchTextDebounce.trim().length === 0) {
            setItemList([]);
        }
        const fetchProduct = async () => {
            const res = await request.get('products/search', {
                params: {
                    name: searchTextDebounce,
                },
            });

            setItemList(res.data.products.slice(0, 5));
        };

        fetchProduct();
    }, [searchTextDebounce]);

    return (
        <SearchPopper items={itemList} callback={setSearchText}>
            <div className={cx('wrapper')}>
                <button className={cx('search-icon')} onClick={handleSearchClick}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input
                    className={cx('search-input')}
                    placeholder="Search for product..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyUp={handleKeyPress.bind(this)}
                />
            </div>
        </SearchPopper>
    );
}

export default SearchBar;
