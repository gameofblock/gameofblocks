import React from 'react'
import classNames from 'classnames'

import './style.css'

const MapDemoNavigation = props => {

  const steps = {
    1: { text: props.translations.tutorial_step1 },
    2: { text: props.translations.tutorial_step2 },
    3: { text: props.translations.tutorial_step3 },
    4: { text: props.translations.tutorial_step4 },
    5: { text: props.translations.tutorial_step5 }
  }

  const progressStyle = {
    width: (props.step - 1) * 25 + '%'
  }

  return (
    <div className="map-demo__navigation">
      <div className="map-demo__navigation-content">
        {props.step > 1 && (
          <button
            className="map-demo__modals-nav"
            onClick={() => props.switchSteps(props.step - 1)}
          >
            <i className="fas fa-arrow-alt-circle-left" />
          </button>
        )}
        <React.Fragment>
          {Object.keys(steps).map((key, index) => {
            const style = {
              left: index * 100 + 'px'
            }
            const buttonClasses = classNames('map-demo__button', {
              'map-demo__button--current': props.step === index + 1,
              'map-demo__button--done': props.step > index + 1
            })
            return (
              <button
                key={key}
                className={buttonClasses}
                onClick={() => props.switchSteps(index + 1)}
                style={style}
              >
                {props.step > index + 1 && (
                  <span className="map-demo__button-icon">
                    <i className="fas fa-check" />
                  </span>
                )}
                {props.step === index + 1 && (
                  <span className="map-demo__button-icon map-demo__button-icon--current" />
                )}
                <span className="map-demo__button-text">{steps[key].text}</span>
              </button>
            )
          })}
        </React.Fragment>
        {props.step < 5 && (
          <button
            className="map-demo__modals-nav map-demo__modals-nav--right"
            onClick={() => props.switchSteps(props.step + 1)}
          >
            <i className="fas fa-arrow-alt-circle-right" />
          </button>
        )}
        <div className="map-demo__timeline" />
        <div className="map-demo__timeline-fill" style={progressStyle} />
      </div>
    </div>
  )
}

export default MapDemoNavigation
