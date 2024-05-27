import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import React, { useRef, useEffect } from 'react';

import Wrapper from '../Wrapper';
import styles from './SearchPopper.module.scss';

const cx = classNames.bind(styles);

function SearchPopper({ items, children, callback }) {
    const searchRef = useRef();
    const wrapperRef = useRef();

    useEffect(() => {
        if (searchRef.current && searchRef.current.popper && wrapperRef.current) {
            const wrapperWidth = wrapperRef.current.getBoundingClientRect().width;
            searchRef.current.popper.style.width = `${wrapperWidth}px`;
        }
    }, [items]);

    return (
        <Tippy
            visible={items.length > 0}
            onCreate={(instance) => {
                searchRef.current = instance;
            }}
            onClickOutside={(instance) => instance.hide()}
            interactive={true}
            placement="bottom-start"
            render={(attrs) => (
                <div className={cx('wrapper')} {...attrs} ref={searchRef}>
                    <Wrapper classnames={cx('search-wrapper')}>
                        {items.length > 0 &&
                            items.map((item, index) => (
                                <div className={cx('item')} key={index} onClick={() => callback(item.name)}>
                                    <span>{item.name}</span>
                                </div>
                            ))}
                    </Wrapper>
                </div>
            )}
        >
            {React.cloneElement(children, { ref: wrapperRef })}
        </Tippy>
    );
}

export default SearchPopper;
