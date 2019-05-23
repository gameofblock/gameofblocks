import React from 'react'

import MapDemoNavigation from './MapDemoNavigation'
import MapDemoModals from './MapDemoModals'
import {
  DEFAULT_BLOCK_X_SPACE,
  DEFAULT_BLOCK_Y_SPACE,
  tiles
} from '../../constants/blocks'
import iced from '../../images/tileIced.png'

import './style.css'

const MapDemo = props => {
  const mapHeight = window.innerHeight
  const containerWidth = 15 * DEFAULT_BLOCK_X_SPACE + DEFAULT_BLOCK_X_SPACE
  const containerHeight = 10 * DEFAULT_BLOCK_Y_SPACE

  const mapStyle = {
    height: mapHeight
  }

  const mapContentStyle = {
    width: containerWidth,
    height: containerHeight,
    marginTop: -(containerHeight / 2),
    marginLeft: -(containerWidth / 2)
  }

  return (
    <div className="map-demo" style={mapStyle}>
      <MapDemoNavigation {...props} />
      <MapDemoModals {...props} />
      <div className="map-demo__content" style={mapContentStyle}>
        {props.map && (
          <React.Fragment>
            {Object.keys(props.map).map((key, index) => {
              const style = {
                marginTop: props.map[key].yPosition,
                marginLeft: props.map[key].xPosition
              }
              return (
                <div
                  key={props.map[key].id}
                  className="map-demo__image-container"
                  style={style}
                >
                  {!props.map[key].title &&
                    props.map[key].type !== 6 &&
                    props.isFrozen && (
                      <img
                        alt={props.map[key].id}
                        className="map-demo__image map-demo__image--frozen"
                        src={iced}
                      />
                    )}
                  {props.map[key].isReward ? (
                    <React.Fragment>
                      <img
                        alt={props.map[key].id}
                        className="map-demo__image"
                        src={tiles.plain.img}
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {props.map[key].level ? (
                        <img
                          alt={props.map[key].id}
                          className="map-demo__image"
                          src={
                            tiles[props.map[key].type].tiersImg[
                              props.map[key].level
                            ]
                          }
                        />
                      ) : (
                        <img
                          alt={props.map[key].id}
                          className="map-demo__image"
                          src={tiles[props.map[key].type].img}
                        />
                      )}
                    </React.Fragment>
                  )}
                  {props.map[key].type !== 6 && (
                    <div className="map-demo__image-title">
                      {props.map[key].title ? (
                        <React.Fragment>{props.map[key].title}</React.Fragment>
                      ) : (
                        <React.Fragment>
                          {tiles[props.map[key].type].title}
                        </React.Fragment>
                      )}
                    </div>
                  )}
                  {props.map[key].type !== 6 && (
                    <div className="map-demo__image-price">
                      {props.map[key].level ? (
                        <React.Fragment>
                          {props.map[key].level === 2 && (
                            <React.Fragment>0.06 NAS</React.Fragment>
                          )}
                          {props.map[key].level === 3 && (
                            <React.Fragment>0.09 NAS</React.Fragment>
                          )}
                          {props.map[key].level === 4 && (
                            <React.Fragment>0.12 NAS</React.Fragment>
                          )}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>0.03 NAS</React.Fragment>
                      )}
                    </div>
                  )}
                  {props.map[key].isReward && (
                    <React.Fragment>
                      <div className="map-demo__image-title">Khaleesi</div>
                      <div className="map-demo__image-price">
                        <React.Fragment>1.33 NAS</React.Fragment>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              )
            })}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default MapDemo
