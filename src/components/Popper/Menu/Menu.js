import React, { useState } from 'react'
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import MenuItem from './MenuItem'
import Header from '~/components/Popper/Menu/Header';
import PropTypes from 'prop-types'

const cx = classNames.bind(styles) // cx cho phép viết tên className dạng vd: post-item
const defaultFn = () => { }

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {

    const [history, setHistory] = useState([{ data: items }]);

    const current = history[history.length - 1] // lấy phần tử cuối mảng
    // console.log(current)

    const renderItems = () => {
        return current.data.map((item, i) => {
            const isParent = !!item.children;

            return <MenuItem key={i} data={item} onClick={() => {
                if (isParent) {
                    setHistory(prev => [...prev, item.children])
                } else {
                    onChange(item)
                }
            }}></MenuItem>
        })
    }

    //back lai language da cap
    const handleBack = () => { setHistory(prev => prev.slice(0, prev.length - 1)) }

    const renderResults = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs} >
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </PopperWrapper>

        </div>
    )
    //reset to first page
    const handleResetMenu = () => {
        setHistory(prev => prev.slice(0, 1))
    }

    return (
        <Tippy
            hideOnClick={hideOnClick}
            delay={[0, 700]}
            offset={[16, 8]}
            interactive
            placement='bottom-end'
            render={renderResults}
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    )
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,

}


export default Menu