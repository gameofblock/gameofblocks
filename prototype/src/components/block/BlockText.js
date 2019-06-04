import React from 'react';
import './BlockText.css';

const BlockText = props => {
  const hasText = (props.type < 6 && props.type > 0) || props.isReward;
  if (!hasText) return null;

  const price = (0.03 * props.tier).toFixed(2);
  const text = props.tier === 0 ? '0.03' : price;

  return (
    <div className="block__text">
      <div className="block__text-level">{props.subtitle}</div>
      <div className="block__text-title">{props.title}</div>
      <div className="block__text-price">
        {props.locked ? props.translations.map_locked : `${text} HBAR`}
      </div>
    </div>
  );
};

export default BlockText;
