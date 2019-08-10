import apolloServerKoa from "apollo-server-koa";

export default apolloServerKoa.gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;
