import { Box, Flex, Text } from 'rebass';
import { useQuery } from 'react-apollo';

import { GAMES } from '../../queries/game';
import OpenGames from '../../components/open-games';
import { withAuthSync } from '../../hocs/with-auth-sync';

const Games = () => {
  return (
    <Box p={40}>
      <OpenGames />
    </Box>
  );
};

export default withAuthSync(Games);
