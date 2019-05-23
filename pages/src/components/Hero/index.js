import React, { Component } from 'react'
import { isMobile } from 'react-device-detect'

import { createNewsletterSubscription } from '../../services/firebase'

import './style.css'

class Hero extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailSubmitted: false
    }
    this.submitAccountSubscription = this.submitAccountSubscription.bind(this)
  }

  getNextSpawnDate() {
    let nextTick = new Date(
      this.props.startTime.getTime() + 12 * 60 * 60 * 1000
    )
    while (new Date() > nextTick && nextTick < this.props.endTime) {
      nextTick = new Date(nextTick.getTime() + 12 * 60 * 60 * 1000)
    }
    return nextTick
  }

  render() {

    let heroContainerStyle = {}
    let heroStyle = {}

    if(typeof window !== 'undefined') {
    const heroHeight = window.innerHeight
    if (!isMobile) {
      heroStyle = {
        height: heroHeight,
        paddingTop: heroHeight / 2 - 200
      }
      heroContainerStyle = {
        height: heroHeight
      }
    }
  }

    return (
      
        <div className="hero__container" style={heroContainerStyle}>
          <div className="hero__background" />
          <div className="hero" style={heroStyle}>
            <div className="hero__column">
              <div className="hero__throne" />
            </div>
            <div className="hero__column">
              <h1 className="hero__title">
                {this.props.translations.hero_title}
              </h1>
              <p className="hero__paragraph">
                <b className="hero__subtitle" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: this.props.translations.hero_subtitle
                  }}
                />
              </p>

              <div>
                <a className="button button--green button--large" href="/map">
                  {this.props.translations.hero_subtitle_button}
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

  submitAccountSubscription(values, dispatch, props) {
    if (global.window.ga) {
      global.window.ga('send', 'event', 'Home', 'newsletter_subscription')
    }

    createNewsletterSubscription(values.email).then(() => {
      this.setState({ emailSubmitted: true })
    })
  }
}

export default Hero
