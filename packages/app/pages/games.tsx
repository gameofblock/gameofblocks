import { Box, Flex, Text } from 'rebass';
import { useQuery } from 'react-apollo';
import { GAMES } from '../queries/game';
import OpenGames from '../components/open-games';

const Games = () => {
  return (
    <Box p={40}>
      <OpenGames />
    </Box>
  );
};

export default Games;
