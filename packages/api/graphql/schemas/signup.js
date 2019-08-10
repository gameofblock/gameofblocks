import apolloServerKoa from "apollo-server-koa";

export default apolloServerKoa.gql`
  extend type Query {
    signup: Signup
  }
  extend type Mutation {
    signup(username: String, password: String): Signup
  }
  type Signup {
    id: String
    username: String
    roles: [String]
    token: String
  }
`;
