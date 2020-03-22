import React, { Fragment, FunctionComponent } from 'react';
import { useQuery } from 'react-apollo';
import { Text, Flex } from 'rebass';

import { GAMES } from '../../queries/game';
import { QueryProps } from './types';

const Games: FunctionComponent = () => {
  const { loading, data } = useQuery<QueryProps>(GAMES);

  return (
    <Fragment>
      <Text fontWeight='bold' fontSize={4} mb={40}>
        Liste des parties ouvertes
      </Text>

      {!loading &&
        data &&
        data.game.map(({ id, max_players: maxPlayers }) => (
          <Flex key={id}>
            <Text>{`GAME ${id}`}</Text>
            <Text fontWeight='bold' ml={40}>
              0 / {maxPlayers}
            </Text>
          </Flex>
        ))}
    </Fragment>
  );
};

export default Games;
