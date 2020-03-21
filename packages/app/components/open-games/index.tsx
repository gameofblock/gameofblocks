import { Fragment } from 'react';
import { Flex, Text } from 'rebass';
import { useQuery } from 'react-apollo';

import { GAMES } from '../../queries/game';
import { QueryProps } from './types';

const Games = () => {
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
