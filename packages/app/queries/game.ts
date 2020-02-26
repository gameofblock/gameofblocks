import gql from 'graphql-tag';

export const GAMES = gql`
  query GetGames {
    game {
      id
      max_players
    }
  }
`;
