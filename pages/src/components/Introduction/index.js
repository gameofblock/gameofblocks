import React, { Fragment } from "react"
import Particles from "react-particles-js"

import sigle from "../../images/sigle.svg"

import "./style.css"

const particleConfig = {
  particles: {
    number: { value: 10, density: { enable: true, value_area: 2000 } },
    color: { value: "#fff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#fff" },
      polygon: { nb_sides: 6 },
      image: { src: sigle, width: 100, height: 100 },
    },
    opacity: {
      value: 0.6,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        opacity_max: 0.2,
        sync: true,
      },
    },
    size: {
      value: 2,
      random: false,
      anim: { enable: true, speed: 15, size_min: 40, sync: false },
    },
    line_linked: {
      enable: false,
      distance: 200,
      color: "#ffffff",
      opacity: 1,
      width: 2,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "bottom",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
}

const Introduction = props => {
  let particuleStyle = {}
  let introStyle = {}
  if (typeof window !== "undefined") {
    const introHeight = window.innerHeight
    introStyle = {
      height: introHeight,
      paddingTop: introHeight / 2 - 250,
    }

    const particuleStyle = {
      height: introHeight,
      position: "absolute",
      top: 0,
    }
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
