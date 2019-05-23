import React from "react"

import logo from '../../images/logo.png'

import './style.css'

const Header = ({ language, translations }) => (
  <header className="page-header">
        <nav className="page-header__nav page-header__nav--left">
          <a className="page-header__logo" href="/">
            <img alt="game of blocks" src={logo} />
            {/* <svg className="page-header__logo-sigle" viewBox="0 0 100 100">
            <use href="./icon.svg#icon" />
          </svg>
          <svg className="page-header__logo-image" viewBox="0 0 1200 100">
            <use href="./logo2.svg#logo" />
          </svg> */}
          </a>

          {/* <a
          rel="noopener noreferrer"
          className="page-header__link"
          target="_blank"
          href="https://discord.gg/WqRWWDp"
        >
          Join our Discord
        </a> */}
        </nav>

        <nav className="page-header__nav page-header__nav--right">
          {language !== 'zh' && <a href="/?lang=zh">中</a>}
          {/* {props.language !== 'de' && (
            <a href="/?lang=de">
              <img
                alt="German version"
                className="page-header__flag"
                src={GermanyFlag}
              />
            </a>
          )}
          {props.language !== 'fr' && (
            <a href="/?lang=fr">
              <img
                alt="French version"
                className="page-header__flag"
                src={FranceFlag}
              />
            </a>
          )} */}

          {language !== 'en' && <a href="/?lang=en">EN</a>}

          <a className="page-header__button button button--green" href="/map">
            {translations.menu_play}
          </a>
        </nav>
      </header>
)

export default Header
