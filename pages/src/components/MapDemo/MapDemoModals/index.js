import React from 'react'

import './style.css'

const MapDemoModals = props => {
  return (
    <div className="map-demo__modals">
      {props.step === 1 && (
        <div className="map-demo__modal map-demo__modal--1">
          <div className="map-demo__modal-header map-demo__modal-header--1" />
          <h1 className="map-demo__title">
            {props.translations.tutorial_title_step1}
          </h1>
          <p className="map-demo__paragraph">
            {props.translations.tutorial_description_step1}
          </p>
          <button
            className="button button--green button--large"
            onClick={() => props.switchSteps(2)}
          >
            {props.translations.tutorial_button_step1}
          </button>
        </div>
      )}
      {props.step === 2 && (
        <div className="map-demo__modal map-demo__modal--2">
          <div className="map-demo__modal-header map-demo__modal-header--3" />
          <h1 className="map-demo__title">
            {props.translations.tutorial_title_step2}
          </h1>
          <p
            className="map-demo__paragraph"
            dangerouslySetInnerHTML={{
              __html: props.translations.tutorial_description_step2
            }}
          />
          <button
            className="button button--green button--large"
            onClick={() => props.switchSteps(3)}
          >
            {props.translations.tutorial_button_step2}
          </button>
        </div>
      )}

      {props.step === 3 && (
        <div className="map-demo__modal map-demo__modal--2">
          <div className="map-demo__modal-header map-demo__modal-header--3" />
          <h1 className="map-demo__title">
            {props.translations.tutorial_title_step3}
          </h1>
          <p className="map-demo__paragraph">
            {`You can extend your kingdom by conquering
            enemy blocks, roll the dice to attack (0.01 NAS per attack).
            If you win, your enemy's block will drop 1 level below. Win an attack on Level-1 block and it's yours!`}
            <br />

            <br />
            {`If you lose the dice roll, the 0.01 NAS will go to to your opponent. If you win, they'll go to the chest`}
            {/* <br />
            <br />
            {`
            TIPS: You can lock your block to protect your Kingdom from
            invasion.`} */}
          </p>
          <button
            className="button button--green button--large"
            onClick={() => props.switchSteps(4)}
          >
            {props.translations.tutorial_button_step3}
          </button>
        </div>
      )}

      {props.step === 4 && (
        <div className="map-demo__modal map-demo__modal--2">
          <div className="map-demo__modal-header map-demo__modal-header--3" />
          <h1 className="map-demo__title">Conquer new lands</h1>
          <p className="map-demo__paragraph">
            The higher the level, the more points a block is worth.
            <br />
            <br />
            The more points you earn, the more powerful your kingdom will
            become.
            <br />
            <br />
            Blocks can be upgraded up to level 4.
            <br />
            {/* TIPS: To acquire a level 2 block, you must invade a level 1 block, and so on. */}
          </p>
          <button
            className="button button--green button--large"
            onClick={() => props.switchSteps(5)}
          >
            conquer the map
          </button>
        </div>
      )}

      {props.step === 5 && (
        <div className="map-demo__modal map-demo__modal--5">
          <div className="map-demo__modal-header map-demo__modal-header--2" />
          <h1 className="map-demo__title">Win the treasure chest</h1>
          <p className="map-demo__paragraph">
            As soon as a player reaches 1000 points, the game stops and all
            transactions cease.
            <br />
            <br />
            He is then crowned King, and wins the treasure chest.
            <br />
            <br />
            {/* TIPS: Own the most Desert points and you may take home the Desert
            chest, and so on. */}
          </p>
          <a className="button button--green button--large" href="/map">
            {`Start playing`}
          </a>
        </div>
      )}
    </div>
  )
}

export default MapDemoModals
