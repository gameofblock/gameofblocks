import React from 'react';
import Block from './Block';

const ActiveBlock = props => {
  return (
    <Block
      hasDragged={props.hasDragged}
      {...props}
      {...props.selectedKingdom}
    />
  );
};

export default ActiveBlock;
