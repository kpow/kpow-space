import { Link } from 'gatsby'
import React from 'react'
import { Container, Menu, Responsive } from 'semantic-ui-react'

import styles from './project-preview.module.css'

import Skull from '../static/skull.svg'

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className={styles.root}>

    <Menu fixed="top" size="large" inverted compact >
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
                fontFamily: 'Slackey',
                fontSize: '.7em'
              }}
            >
              kpow
            </span>
          </h1>
        </Menu.Item>
        <Menu.Item position='right' >
          <a href='https://www.visualcv.com/kevin-power/' target='_blank'>resume</a>
        </Menu.Item>
        <Menu.Item as={Link} to='/archive/'>
          projects
        </Menu.Item>
        <Menu.Item as={Link} to='/allbooks/'>
          books
        </Menu.Item>
        <Menu.Item as={Link} to='/allstars/'>
          stars
        </Menu.Item>

      </Container>
    </Menu>

  </div>
)

export default Header
