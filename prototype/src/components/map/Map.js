import React, { Component } from 'react';
import DraggableMap from './DraggableMap';

import {
  DEFAULT_BLOCK_X_SPACE,
  DEFAULT_BLOCK_Y_SPACE,
  mapSize,
} from '../../constants/blocks';

import './Map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 800,
      height: 600,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
    // TODO use global event emitter instead globalEvents.emit('onMapInit',
    // className)
    document.body.classList.add('isMap');
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    // TODO use global event emitter instead globalEvents.emit('onMapInit',
    // className)
    document.body.classList.remove('isMap');
  }

  updateDimensions() {
    if (
      window.innerWidth !== this.state.width ||
      window.innerHeight !== this.state.height
    )
      this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const containerWidth =
      mapSize.xSize * DEFAULT_BLOCK_X_SPACE + DEFAULT_BLOCK_X_SPACE / 2 + 35;
    const containerHeight = mapSize.ySize * DEFAULT_BLOCK_Y_SPACE + 60;

    return (
      <DraggableMap
        {...this.props}
        containerHeight={containerHeight}
        containerWidth={containerWidth}
        height={this.state.height}
        width={this.state.width}
      />
    );
  }
}

export default Map;
