import React, { Component } from 'react';
import BlockImage from './BlockImage';
import BlockText from './BlockText';
import BlockEmblem from './BlockEmblem';
import './Block.css';

class Block extends Component {
  // @param {bool} this.props.hasDragged Map has dragged
  // @param {bool} this.props.isReward Identify is the block is a reward
  // @param {bool} this.props.type Identify current type of the block
  // @param {bool} this.props.id Identify current block id
  onBlockClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.props.hasDragged) {
      if (this.props.isReward) {
        this.props.showReward(this.props.type, this.props.id);
      } else {
        this.props.selectKingdom(this.props.type, this.props.id);
      }
    }
  }

  render() {
    const style = {
      top: this.props.yPosition,
      left: this.props.xPosition,
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      UserSelect: 'none',
    };

    return (
      <div
        className="block"
        name={this.props.id}
        onClick={e => this.onBlockClick(e)}
        role="presentation"
        style={style}
      >
        {this.props.type !== 6 && (
          <React.Fragment>
            <BlockEmblem {...this.props} />
            <BlockText {...this.props} />
          </React.Fragment>
        )}
        <BlockImage {...this.props} />
      </div>
    );
  }
}

export default Block;
