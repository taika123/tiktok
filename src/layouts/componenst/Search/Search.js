import React, { useEffect, useState, useRef } from 'react'
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem/index';
import classNames from 'classnames/bind'
import styles from './Search.module.scss'
import { SearchIcon } from '../../../components/Icons/index';
import { useDebounce } from '~/hook';
import * as searchServices from '~/services/searchService'

const cx = classNames.bind(styles) // cx cho phép viết tên className dạng vd: post-item

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)

    //loading value default is false
    const [loading, setLoading] = useState(false)

    //debounced search API, tránh gọi lại API liên tục
    const debounced = useDebounce(searchValue, 500)

    const inputRef = useRef()

    useEffect(() => {

        if (!debounced.trim()) {
            setSearchResult([])
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounced);

            setSearchResult(result)

            setLoading(false);

            // try {
            //     const res = await request.get('users/search', {
            //         params: {
            //             q: debounced,
            //             type: 'less'
            //         },
            //     })
            //     setSearchResult(res.data)
            //     setLoading(false);
            // } catch (error) {
            //     setLoading(false);
            // }
        }

        fetchApi();

    }, [debounced])

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus();
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) { // bắt đầu bằng dấu cách thì xóa đi
            setSearchValue(e.target.value)
        }
    }

    return (
        //Using a wrapper <div> or <span> tag around the reference element solves
        // this by creating a new parentNode context. 
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs} >
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>
                                Accounts
                            </h4>
                            {searchResult.map((result, i) => (
                                <AccountItem key={result.id} data={result} />
                            ))}

                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >

                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck="false"
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}


                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                        <SearchIcon className={cx('searchIcon')} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    )
}

export default Search