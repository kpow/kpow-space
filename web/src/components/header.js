import {Link} from 'gatsby'
import React from 'react'
import Icon from './icon'
import {cn} from '../lib/helpers'
import {Container, Menu} from 'semantic-ui-react'

import HeaderStyles from './header.module.css'
import styles from './project-preview.module.css'

import Skull from '../static/skull.svg';

const Header = ({onHideNav, onShowNav, showNav, siteTitle}) => (
  <div className={styles.root}>

    <Menu fixed="top" size="large" inverted compact>
      <Container>
        <Menu.Item style={{ padding: '0' }} as={Link} to="/">
          <h1 className="site-logo">
            <img
              height="50"
              style={{
                display: 'inline-block',
                paddingTop: '3px',
                paddingBottom: '5px',
                verticalAlign: 'middle'
              }}
              src={Skull}
            />
            <span
              style={{
                display: 'inline-block',
                paddingRight: '5px',
                paddingTop: '5px',
                height: '50px',
                verticalAlign: 'middle',
                fontFamily:'Slackey'
              }}
            >
              kpow
            </span>
          </h1>
        </Menu.Item>
        <Menu.Item position='right' as={Link} to='/allstars'>
          allstars
        </Menu.Item>
        <Menu.Item as={Link} to='/allbooks'>
          allbooks
        </Menu.Item>
        <Menu.Item>
          <a href='https://instagram.com/kpow_musicgram'>insta</a>
        </Menu.Item>
      </Container>
    </Menu>
  

    <div className={HeaderStyles.wrapper}>

      <button className={HeaderStyles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol='hamburger' />
      </button>

      <nav className={cn(styles.nav, showNav && HeaderStyles.showNav)}>
        <ul>
          <li>
            <Link to='/archive/'>Archive</Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
)

export default Header
