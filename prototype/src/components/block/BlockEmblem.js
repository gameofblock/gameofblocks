import React from 'react';

import './BlockEmblem.css';

const BlockEmblem = props => {
  const hasEmblem = props.type < 6 && props.type > 0;
  if (props.emblem === null) return null;
  if (!hasEmblem) return null;
  if (!props.emblem || props.emblem === '') return null;
  const image = require('../../images/icons/' + props.emblem);
  return <img alt="" className="block__emblem-image" src={image} />;
};

export default BlockEmblem;
