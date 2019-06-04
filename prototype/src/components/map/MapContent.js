import React, { Fragment } from 'react';
import Block from '../block/Block';
import { mapDemo } from '../../constants/map';

const MapContent = props => {
  const mapArray = Object.keys(mapDemo).map(i => mapDemo[i]);
  return (
    <Fragment>
      {mapArray
        .filter(item => item.type !== 6)
        .map((item, index) => {
          return (
            <Block
              key={item.id}
              hasDragged={props.hasDragged}
              isFrozen={props.isFrozen}
              isKingdomSelected={props.isKingdomSelected}
              isOwner={props.isOwner}
              mapViewers={props.mapViewers}
              selectedKingdom={props.selectedKingdom}
              selectKingdom={props.selectKingdom}
              showReward={props.showReward}
              {...item}
              translations={props.translations}
            />
          );
        })}
    </Fragment>
  );
};

export default MapContent;
