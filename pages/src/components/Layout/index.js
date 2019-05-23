import React from "react"
import PropTypes from "prop-types"

import Header from "../Header"

import "../../stylesheets/normalize.css"
import "./style.css"

const Layout = ({ children }) => (
  <div className="page">
    <Header />
    <main>{children}</main>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
