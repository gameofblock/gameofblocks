import apolloServerKoa from "apollo-server-koa";

export default apolloServerKoa.gql`
  extend type Query {
    login: Login
  }
  extend type Mutation {
    login(username: String, password: String): Login
  }
  type Login {
    id: String
    username: String
    roles: [String]
    token: String
  }
`;
