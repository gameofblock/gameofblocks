import Mountain from '../images/headers/Mountain.png';
import Water from '../images/headers/Lake.png';
import Plain from '../images/headers/Plain.png';
import Desert from '../images/headers/Desert.png';
import Forest from '../images/headers/Forest.png';
import Mountain2 from '../images/headers/mountain-village.png';
import Water2 from '../images/headers/water-village.png';
import Plain2 from '../images/headers/plain-village.png';
import Desert2 from '../images/headers/desert-village.png';
import Forest2 from '../images/headers/forest-village.png';
import Mountain3 from '../images/headers/mountain-city.png';
import Water3 from '../images/headers/water-city.png';
import Plain3 from '../images/headers/plain-city.png';
import Desert3 from '../images/headers/desert-city.png';
import Forest3 from '../images/headers/forest-city.png';
import Mountain4 from '../images/headers/mountain-tower.png';
import Water4 from '../images/headers/water-tower.png';
import Plain4 from '../images/headers/plain-tower.png';
import Desert4 from '../images/headers/desert-tower.png';
import Forest4 from '../images/headers/forest-tower.png';
import Mountain5 from '../images/headers/mountain-castle.png';
import Water5 from '../images/headers/water-castle.png';
import Plain5 from '../images/headers/plain-castle.png';
import Desert5 from '../images/headers/desert-castle.png';
import Forest5 from '../images/headers/forest-castle.png';
import Castle from '../images/headers/Castle.png';
import Ice from '../images/headers/Ice.png';

import tileMountain1 from '../images/tiles/tileMountain-1.png';
import tileMountain2 from '../images/tiles/tileMountain-2.png';
import tileMountain3 from '../images/tiles/tileMountain-3.png';
import tileMountain4 from '../images/tiles/tileMountain-4.png';
import tileDesert1 from '../images/tiles/tileDesert-1.png';
import tileDesert2 from '../images/tiles/tileDesert-2.png';
import tileDesert3 from '../images/tiles/tileDesert-3.png';
import tileDesert4 from '../images/tiles/tileDesert-4.png';
import tileForest1 from '../images/tiles/tileForest-1.png';
import tileForest2 from '../images/tiles/tileForest-2.png';
import tileForest3 from '../images/tiles/tileForest-3.png';
import tileForest4 from '../images/tiles/tileForest-4.png';
import tileWater1 from '../images/tiles/tileWater-1.png';
import tileWater2 from '../images/tiles/tileWater-2.png';
import tileWater3 from '../images/tiles/tileWater-3.png';
import tileWater4 from '../images/tiles/tileWater-4.png';
import tilePlain1 from '../images/tiles/tilePlain-1.png';
import tilePlain2 from '../images/tiles/tilePlain-2.png';
import tilePlain3 from '../images/tiles/tilePlain-3.png';
import tilePlain4 from '../images/tiles/tilePlain-4.png';
import tileMountain from '../images/tiles/tileMountain-0.png';
import tileWater from '../images/tiles/tileWater-0.png';
import tilePlain from '../images/tiles/tilePlain-0.png';
import tileDesert from '../images/tiles/tileDesert-0.png';
import tileForest from '../images/tiles/tileForest-0.png';
import tileIce from '../images/tiles/tileIce@2x.png';
import tileEmpty from '../images/tiles/tileEmpty@2x.png';

import tilePlainReward from '../images/rewards/plain.png';
import tileMountainReward from '../images/rewards/mountain.png';
import tileWaterReward from '../images/rewards/lake.png';
import tileDesertReward from '../images/rewards/desert.png';
import tileForestReward from '../images/rewards/forest.png';
import tileGlobalReward from '../images/rewards/global.png';

export const DEFAULT_BLOCK_X_SPACE = 183;
export const DEFAULT_BLOCK_Y_SPACE = 158;
export const DEFAULT_BLOCK_WIDTH = 200;
export const DEFAULT_BLOCK_HEIGHT = 200;

export const mapSize = {
  xSize: 14,
  ySize: 14,
};

export const getTiles = type => {
  const translations = require(`../translations/en.json`);
};

export const tiles = {
  0: {
    header: Ice,
    img: tileIce,
    color: '#F0FFFF',
    color2: '#0C6E88',
    color3: '#00DFB4',
    title: 'Ice',
    tiersImg: {
      2: tilePlain1,
      3: tilePlain2,
      4: tilePlain3,
      5: tilePlain4,
    },
  },
  1: {
    header: Plain,
    img: tilePlain,
    color: '#2ec4b6',
    color2: '#56DACE',
    color3: '#6AEAA6',
    title: 'Plain',
    tiersImg: {
      2: tilePlain1,
      3: tilePlain2,
      4: tilePlain3,
      5: tilePlain4,
    },
    tiersHeader: {
      1: Plain2,
      2: Plain3,
      3: Plain4,
      4: Plain5,
    },
  },
  2: {
    header: Mountain,
    img: tileMountain,
    color: '#35506D',
    color2: '#537496',
    color3: '#1BE7FF',
    title: 'Mountain',
    tiersImg: {
      2: tileMountain1,
      3: tileMountain2,
      4: tileMountain3,
      5: tileMountain4,
    },
    tiersHeader: {
      1: Mountain2,
      2: Mountain3,
      3: Mountain4,
      4: Mountain5,
    },
  },
  3: {
    header: Water,
    img: tileWater,
    color: '#71e4ff',
    color2: '#B6F1FF',
    color3: '#157B9E',
    title: 'Water',
    tiersImg: {
      2: tileWater1,
      3: tileWater2,
      4: tileWater3,
      5: tileWater4,
    },
    tiersHeader: {
      1: Water2,
      2: Water3,
      3: Water4,
      4: Water5,
    },
  },
  4: {
    header: Desert,
    img: tileDesert,
    color: '#FEB100',
    color2: '#FFCA55',
    color3: '#FF9D00',
    title: 'Desert',
    tiersImg: {
      2: tileDesert1,
      3: tileDesert2,
      4: tileDesert3,
      5: tileDesert4,
    },
    tiersHeader: {
      1: Desert2,
      2: Desert3,
      3: Desert4,
      4: Desert5,
    },
  },
  5: {
    header: Forest,
    img: tileForest,
    color: '#004456',
    color2: '#0C6E88',
    color3: '#00DFB4',
    title: 'Forest',
    tiersImg: {
      2: tileForest1,
      3: tileForest2,
      4: tileForest3,
      5: tileForest4,
    },
    tiersHeader: {
      1: Forest2,
      2: Forest3,
      3: Forest4,
      4: Forest5,
    },
  },
  6: {
    header: Ice,
    img: tileEmpty,
    color: '#F0FFFF',
    color2: '#0C6E88',
    color3: '#00DFB4',
    title: 'Empty',
    tiersImg: {
      2: tilePlain1,
      3: tilePlain2,
      4: tilePlain3,
      5: tilePlain4,
    },
  },
  plain: {
    title: 'Plain king',
    rewardType: 1,
    isReward: true,
    img: tilePlainReward,
    color: '#2ec4b6',
    inverseColor: '#a5ffd6',
    tiersImg: {
      2: tilePlain1,
      3: tilePlain2,
      4: tilePlain3,
      5: tilePlain4,
    },
  },
  mountain: {
    title: 'Mountain king',
    rewardType: 2,
    isReward: true,
    img: tileMountainReward,
    color: '#35506D',
    inverseColor: '#1be7ff',
    tiersImg: {
      2: tilePlain1,
      3: tilePlain2,
      4: tilePlain3,
      5: tilePlain4,
    },
  },
  water: {
    title: 'Water king',
    rewardType: 3,
    isReward: true,
    img: tileWaterReward,
    color: '#71e4ff',
    inverseColor: '#007ca2',
    tiersImg: {
      2: tilePlain1,
      3: tilePlain2,
      4: tilePlain3,
      5: tilePlain4,
    },
  },
  desert: {
    title: 'Desert king',
    rewardType: 4,
    isReward: true,
    img: tileDesertReward,
    color: '#FEB100',
    inverseColor: '#ffee93',
    tiersImg: {
      2: tilePlain1,
      3: tilePlain2,
      4: tilePlain3,
      5: tilePlain4,
    },
  },
  forest: {
    title: 'Forest king',
    rewardType: 5,
    isReward: true,
    img: tileForestReward,
    color: '#004456',
    inverseColor: '#00e5b9',
    tiersImg: {
      2: tilePlain1,
      3: tilePlain2,
      4: tilePlain3,
      5: tilePlain4,
    },
  },
  global: {
    title: 'Global king',
    rewardType: 0,
    isReward: true,
    img: tileGlobalReward,
    color: '#004456',
    inverseColor: '#00e5b9',
    tiersImg: {
      2: tilePlain1,
      3: tilePlain2,
      4: tilePlain3,
      5: tilePlain4,
    },
  },
};
