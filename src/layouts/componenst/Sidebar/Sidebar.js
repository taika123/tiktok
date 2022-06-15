import React from 'react'
import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind'
import config from '~/config'
import Menu, { MenuItem } from './Menu'
import { HomeIcon, UserGroupIcon, LiveIcon, HomeActiveIcon, UserGroupActiveIcon, LiveActiveIcon } from '~/components/Icons'
// import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For Your" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem title="Following" to={config.routes.following} icon={<UserGroupIcon />} activeIcon={<UserGroupActiveIcon />} />
                <MenuItem title="Live" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
        </div>
    )
}

export default Sidebar