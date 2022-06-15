import React, { useState, forwardRef } from 'react'
import images from '~/assets/images'
import styles from './Image.module.scss'
import classNames from 'classnames';
// console.log(images.noImage)
import PropTypes from 'prop-types'

const Image = forwardRef(({ src, alt, className, fallback: imageFallback = images.noImage, ...props }, ref) => {

    const [fallback, setFallback] = useState('')
    const handleError = () => {
        setFallback(images.noImage)
    }
    return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallback || src}
            alt={alt} {...props}
            onError={handleError}
        />
    )
})

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
}

export default Image