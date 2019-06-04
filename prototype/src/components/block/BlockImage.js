import React from 'react';
import classNames from 'classnames';
import { tiles } from '../../constants/blocks';

import './BlockImage.css';

const BlockImage = props => {
  const blockImageStyle = classNames('map-demo__image', {
    'map-demo__image--available':
      props.isFrozen === 'false' &&
      props.tier > 0 &&
      props.type > 0 &&
      props.type < 6,
  });

  if (!props.type) return null;

  return props.tier ? (
    <img
      alt={props.id}
      className={blockImageStyle}
      src={tiles[props.type].tiersImg[props.tier + 1]}
    />
  ) : (
    <img
      alt={props.id}
      className={blockImageStyle}
      src={tiles[props.type].img}
    />
  );
};

export default BlockImage;
