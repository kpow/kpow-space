import React from 'react'
import Header from './header'
import Footer from './footer'
import Helmet from 'react-helmet'
import {
  Container
} from 'semantic-ui-react';

import '../styles/layout.css'
import LayoutStyles from './layout.module.css'

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => (
  <>
    <Helmet>
      <link href="https://fonts.googleapis.com/css?family=Slackey&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      <script src="https://apps.elfsight.com/p/platform.js" defer></script>

    </Helmet>

    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <Container>
      <div className={LayoutStyles.content}>{children}</div>
    </Container>
    <Footer />

  </>
)

export default Layout
