import gql from 'graphql-tag';

export const GAMES = gql`
  query GetGames {
    game {
      id
      max_players
    }
  }
`;

export const GAME = gql`
  query GetGame($id: uuid!) {
    game(where: { id: { _eq: $id } }) {
      id
      max_players
    }
  }
`;
