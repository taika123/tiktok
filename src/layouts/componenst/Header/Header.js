import React from 'react'
import config from '~/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEllipsisVertical, faEarthAmericas, faCircleQuestion, faUser, faCoins, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { InboxIcon, MessageIcon } from '~/components/Icons/index';
import { faKeyboard } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import Tippy from '@tippyjs/react'; // different import path!
import images from '~/assets/images'
import Button from '~/components/Button/index';
import Menu from '~/components/Popper/Menu/index';
import 'tippy.js/dist/tippy.css'; // optional
import Image from '~/components/Image';
import Search from '~/layouts/componenst/Search';

const cx = classNames.bind(styles) // cx cho phép viết tên className dạng vd: post-item

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAmericas} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt'
                },
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'keyboard shorcuts'
    },
]
const currentUser = true;

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Get Profile',
        to: '/@tranthanh'
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get Coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Setting',
        to: '/setting'
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/logout',
        separate: true
    },
]

function Header() {



    //handle logic
    const handleMenuChange = (menuItem) => {
        // console.log(menuItem)
        switch (menuItem.type) {
            case 'language':
                //handle
                break;
            default:
        }
    }

    return (

        < header className={cx('wrapper')} >
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="tiktok"></img>
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button outlined className={cx('action-upload')} leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>
                            <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon className={cx('action-custom')} />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon className={cx('action-custom')} />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button outlined leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>
                            <Button primary>Log in</Button>

                        </>
                    )}
                    <Menu
                        items={currentUser ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                    >
                        {currentUser ? (
                            <Image src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/50a6cd9972dd1f6f7264b1778902407c~c5_100x100.jpeg?x-expires=1655373600&x-signature=WkdBvSVlnqzOS56I5anh7h2bOjo%3D"
                                alt="hinhanh"
                                className={cx('user-avatar')}></Image>
                        ) : (
                            <button className={cx('more-icon')} >
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header >
    )
}

export default Header