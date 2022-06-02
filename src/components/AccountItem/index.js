import React from 'react'
import classNames from 'classnames/bind'
import styles from './AccountItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles)

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/1c4d554b41eccba47d84398d2a1df9cb~c5_300x300.webp?x-expires=1653825600&x-signature=3k%2Bt4aNrPuRDgwFAwXCmAFVTAqE%3D"
                alt="supportname"
                className={cx("avatar")} />

            <div className={cx("info")}>
                <p className={cx("name")}>
                    <span className={cx("nameid")}>Nguyen Van A</span>
                    <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
                </p>
                <span className={cx("username")}>
                    Nguyen Van A
                </span>
            </div>
        </div>
    )
}

export default AccountItem