import React from 'react';
import { Motion, spring, presets } from 'react-motion';

import Block from './Block';

export default class DraggableMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.dataSource,
      dragging: false,
      hasSelectedKingdom: false,
      hasDragged: false,
      scrollX: (this.props.containerWidth - this.props.screenWidth) / 2,
      scrollY: (this.props.containerHeight - this.props.screenHeight) / 2,
    };
  }

  render() {
    return (
      <Motion
        style={{
          scrollTop: spring(this.state.scrollY, presets.Wobble),
          scrollLeft: spring(this.state.scrollX, presets.Wobble),
        }}
      >
        {currentStyles => {
          const containerStyle = {
            style: {
              height: this.props.containerHeight,
              width: this.props.containerWidth,
              transform: `translate3d(
                -${this.state.scrollX}px,
                -${this.state.scrollY}px,
                0
              )`,
            },
          };
          return (
            <div
              className={this.props.className}
              {...containerStyle}
              ref={ref => (this._div = ref)}
              id="scroll-container"
              onMouseDown={this.mouseDownHandle.bind(this)}
              onMouseUp={this.mouseUpHandle.bind(this)}
              role="presentation"
            >
              {this.props.blockMap.map((item, index) => {
                return (
                  <Block
                    key={item.id}
                    hasDragged={this.state.hasDragged}
                    isFrozen={this.props.isFrozen}
                    isKingdomSelected={this.props.isKingdomSelected}
                    isOwner={this.props.isOwner}
                    selectedKingdom={this.props.selectedKingdom}
                    selectKingdom={this.props.selectKingdom}
                    showReward={this.props.showReward}
                    {...item}
                  />
                );
              })}
            </div>
          );
        }}
      </Motion>
    );
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.mouseUpHandle.bind(this));
    window.addEventListener('mousemove', this.mouseMoveHandle.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props.hasSelectedKingdom) {
      this.state.hasSelectedKingdom = nextProps.hasSelectedKingdom;
      this.setState(this.state);
    }
  }

  componentDidUpdate(prevProps) {
    this.state.hasDragged = false;
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.mouseUpHandle.bind(this));
    window.removeEventListener('mousemove', this.mouseMoveHandle.bind(this));
  }

  mouseUpHandle(e) {
    if (this.state.dragging) {
      if (
        this.state.startY - e.clientY > 15 ||
        this.state.startY - e.clientY < -15 ||
        this.state.startX - e.clientX > 15 ||
        this.state.startX - e.clientX < -15
      ) {
        this.state.hasDragged = true;
      }
      this.state.dragging = false;
      this.setState(this.state);
    }
  }

  mouseDownHandle(e) {
    if (!this.state.dragging) {
      this.state.hasDragged = false;
      this.state.dragging = true;
      this.state.startX = e.clientX;
      this.state.startY = e.clientY;
      this.setState(this.state);
      this.lastClientX = e.clientX;
      this.lastClientY = e.clientY;
      e.preventDefault();
    }
  }

  mouseMoveHandle(e) {
    if (this.state.dragging) {
      this.state.scrollX -= -this.lastClientX + (this.lastClientX = e.clientX);
      this.state.scrollY -= -this.lastClientY + (this.lastClientY = e.clientY);
      this.setState(this.state);
    }
  }
}
