import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchBar.module.scss';
import useDebounce from '../../hooks/useDebounce';

import SearchPopper from '../../poppers/SearchPopper';

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

    const handleSearchClick = (e) => {
        //call api
    };

    useEffect(() => {
        //load products with name include the search text
        item.map((item, i) => {
            setItemList((prev) => [...prev, item]);
        });
    }, [searchTextDebounce]);

    return (
        <SearchPopper items={item} callback={setSearchText}>
            <div className={cx('wrapper')}>
                <button className={cx('search-icon')} onClick={handleSearchClick}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input
                    className={cx('search-input')}
                    placeholder="Search for product..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
        </SearchPopper>
    );
}

export default SearchBar;
