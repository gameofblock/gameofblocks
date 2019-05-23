import React, { useEffect, useState } from "react"
import { isMobile } from "react-device-detect"

import "./style.css"

const Hero = props => {
  const [windowHeight, setWindowHeight] = useState()
  useEffect(() => {
    if (!isMobile) {
      setWindowHeight(window.innerHeight);
    }
  })

  return (
    <div className="hero__container" style={{
      height: windowHeight
    }}>
      <div className="hero__background" />
      <div className="hero" style={{
        height: windowHeight,
        paddingTop: windowHeight / 2 - 200,
      }}>
        <div className="hero__column">
          <div className="hero__throne" />
        </div>
        <div className="hero__column">
          <h1 className="hero__title">{props.translations.hero_title}</h1>
          <p className="hero__paragraph">
            <b className="hero__subtitle" />
            <span
              dangerouslySetInnerHTML={{
                __html: props.translations.hero_subtitle,
              }}
            />
          </p>

          <div>
            <a className="button button--green button--large" href="/map">
              {props.translations.hero_subtitle_button}
            </a>
          </div>
        </div>
        <div id="scrolldown">
          <div className="mouse">
            <span>
              <p>.</p>
            </span>
          </div>
        </div>
        <div className="hero__background hero__background--left" />
      </div>
    </div>
  )
}

export default Hero
