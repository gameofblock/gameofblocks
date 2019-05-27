import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components"

import Header from "../Header"
import theme from './theme'

import "../../stylesheets/normalize.css"
import "./style.css"

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div className="page">
      <Header />
      <main>{children}</main>
    </div>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
