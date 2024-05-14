import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchBar.module.scss';
import useDebounce from '../../hooks/useDebounce';

const cx = classNames.bind(styles);

function SearchBar() {
    const [searchText, setSearchText] = useState('');
    const searchTextDebounce = useDebounce(searchText, 400);

    const handleSearchClick = (e) => {
        //call api
    };

    useEffect(() => {
        //load products with name include the search text
        console.log(searchTextDebounce);
    }, [searchTextDebounce]);

    return (
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
    );
}

export default SearchBar;
