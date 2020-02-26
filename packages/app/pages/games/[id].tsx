import { useRouter } from 'next/router';
import { Box, Text } from 'rebass';

import { useQuery } from 'react-apollo';

import { GAME } from '../../queries/game';

interface QueryProps {
  game: {
    id: string;
  };
}

const Game = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, data } = useQuery<QueryProps>(GAME, {
    variables: {
      id
    }
  });

  return (
    <Box p={40}>
      <Text mb={40}>{id}</Text>
      <Box>{data && data.game.id}</Box>
    </Box>
  );
};

Game.getInitialProps = async ({ query }) => {
  return { id: query.id };
};

export default Game;
