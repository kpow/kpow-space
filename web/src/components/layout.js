import React from 'react'
import Header from './header'
import Helmet from 'react-helmet'



import '../styles/layout.css'
import LayoutStyles from './layout.module.css'

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => (
  <>
    <Helmet>
      <link href="https://fonts.googleapis.com/css?family=Slackey&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
    </Helmet>

    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <div className={LayoutStyles.content}>{children}</div>
    <footer className={LayoutStyles.footer}>

    </footer>
  </>
)

export default Layout
