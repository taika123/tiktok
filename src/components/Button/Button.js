import React from 'react'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    primary = false,
    outline = false,
    outlined = false,
    className, leftIcon,
    rightIcon, rounded = false,
    text = false,
    disabled = false,
    small = false,
    large = false,
    children,
    onClick,
    ...passprops
}) {
    let Comp = 'button'
    const props = {
        onClick,
        ...passprops
    }

    //remove event listener when btn is disabled
    if (disabled) {
        // delete props.disabled
        Object.keys(passprops).forEach((key) => {
            // console.log(key);
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }
    if (to) {
        props.to = to
        Comp = Link
    } else if (href) {
        props.href = href
        Comp = 'a'
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary: primary,  //or primary,
        outline,
        small,
        large,
        text,
        disabled,
        outlined,
        rounded
    })

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    )
}

Button.protoTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    outlined: PropTypes.bool,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    rounded: PropTypes.bool,
    text: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
}

export default Button