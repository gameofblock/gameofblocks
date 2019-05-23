import React, { useEffect, Fragment, useState } from "react"
import Particles from "react-particles-js"

import particleConfig from '../../constants/particles'

import "./style.css"

const Introduction = props => {
  const [windowHeight, setWindowHeight] = useState(0)
  useEffect(() => {
    setWindowHeight(window.innerHeight)
  })

  const introStyle = {
    height: windowHeight,
    paddingTop: windowHeight / 2 - 250,
  }

  const particuleStyle = {
    height: windowHeight,
    position: "absolute",
    top: 0,
  }

  return (
    <Fragment>
      <div className="introduction" style={introStyle}>
        <div className="introduction__content">
          <h4 className="home__pre-title">
            {props.translations.home_app_title}
          </h4>
          <h2 className="home__title">{props.translations.home_title}</h2>
          <p
            className="home__paragraph"
            dangerouslySetInnerHTML={{
              __html: props.translations.home_first_paragraph,
            }}
          />
          <p
            className="home__paragraph"
            dangerouslySetInnerHTML={{
              __html: props.translations.home_second_paragraph,
            }}
          />
          <p
            className="home__paragraph"
            dangerouslySetInnerHTML={{
              __html: props.translations.home_third_paragraph,
            }}
          />
        </div>
        <Particles params={particleConfig} style={particuleStyle} />
      </div>
    </Fragment>
  )
}

export default Introduction
