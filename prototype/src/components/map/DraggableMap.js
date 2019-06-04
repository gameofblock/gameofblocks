import React from 'react';
import { isMobile } from 'react-device-detect';
import { Motion, spring } from 'react-motion';

import MapContent from './MapContent';
import ActiveBlock from '../block/ActiveBlock';

const springStyle = {
  stiffness: 400,
  damping: 30,
  precision: 1,
};

class DraggableMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.dataSource,
      dragging: false,
      hasSelectedKingdom: false,
      hasDragged: false,
      scrollX: 0,
      scrollY: 0,
      globalOpacity: 1,
    };
  }

  render() {
    let containerStyle = {};
    if (this.props.height && this.props.width) {
      containerStyle = {
        style: {
          height: isMobile ? this.props.height : this.props.height + 17,
          width: isMobile ? this.props.width : this.props.width + 17,
          overflow: 'auto',
        },
      };
    }
    const contentStyle = {
      style: {
        height: this.props.containerHeight,
        width: this.props.containerWidth,
      },
    };

    return (
      <div
        className={this.props.className}
        {...containerStyle}
        ref={ref => (this._div = ref)}
        id="scroll-container"
        role="presentation"
      >
        <Motion
          style={{
            scrollTop: spring(this.state.scrollY, springStyle),
            scrollLeft: spring(this.state.scrollX, springStyle),
          }}
        >
          {currentStyles => {
            if (!isMobile) {
              if (this.state.hasSelectedKingdom) {
                this._div.scrollLeft = currentStyles.scrollLeft;
                this._div.scrollTop = currentStyles.scrollTop;
              }
            }
            return null;
          }}
        </Motion>
        <div
          onMouseDown={this.mouseDownHandle.bind(this)}
          onMouseUp={this.mouseUpHandle.bind(this)}
          role="presentation"
          {...contentStyle}
          className="map-beta__container"
        >
          <Motion
            style={{
              opacity: spring(this.state.globalOpacity),
            }}
          >
            {interpolatingStyle => {
              return (
                <div style={interpolatingStyle}>
                  <MapContent
                    hasDragged={this.state.hasDragged}
                    {...contentStyle}
                    {...this.props}
                  />
                </div>
              );
            }}
          </Motion>
          {!isMobile && this.props.hasSelectedKingdom && (
            <ActiveBlock
              hasDragged={this.state.hasDragged}
              {...this.props}
              {...this.props.selectedKingdom}
            />
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('mousewheel', this.mouseWheelhandle.bind(this));
    window.addEventListener('mouseup', this.mouseUpHandle.bind(this));
    window.addEventListener('mousemove', this.mouseMoveHandle.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this.state.hasSelectedKingdom = nextProps.hasSelectedKingdom;
    if (!isMobile && nextProps.hasSelectedKingdom) {
      setTimeout(() => {
        this.state.scrollY =
          nextProps.selectedKingdom.yPosition - this.props.height / 2 + 100;
        this.state.scrollX =
          nextProps.selectedKingdom.xPosition - this.props.width / 2 + 100;
        this.setState(this.state);
      }, 200);
      setTimeout(() => {
        this.state.globalOpacity = 0.5;
        this.setState(this.state);
      }, 400);
      this.setState(this.state);
      // On mobile trigger classic scroll not the animation
    } else {
      this.state.globalOpacity = 1;
      this.setState(this.state);
    }
    if (nextProps.width !== this.props.width) {
      this._div.scrollLeft = (this.props.containerWidth - nextProps.width) / 2;
      this._div.scrollTop = (this.props.containerHeight - nextProps.height) / 2;
      this.state.scrollY = this._div.scrollTop;
      this.state.scrollX = this._div.scrollLeft;
      this.setState(this.state);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.mouseUpHandle.bind(this));
    window.removeEventListener('mousemove', this.mouseMoveHandle.bind(this));
  }

  mouseWheelhandle(e) {
    if (e.target.className === 'map-beta__container') {
      e.stopPropagation();
      e.preventDefault();
      this._div.scrollLeft += e.deltaX;
      this._div.scrollTop += e.deltaY;
      this.state.scrollY = this._div.scrollTop;
      this.state.scrollX = this._div.scrollLeft;
      this.setState(this.state);
    }
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
      // Set the final drag position
      if (!isMobile) {
        this.state.scrollY = this._div.scrollTop;
        this.state.scrollX = this._div.scrollLeft;
      }
      // Set drag to false
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
    if (this.state.dragging && !this.state.hasSelectedKingdom) {
      requestAnimationFrame(() => {
        // Move the map while drag
        this._div.scrollLeft -=
          -this.lastClientX + (this.lastClientX = e.clientX);
        this._div.scrollTop -=
          -this.lastClientY + (this.lastClientY = e.clientY);
      });
    }
  }
}

export default DraggableMap;
