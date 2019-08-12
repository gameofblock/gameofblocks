import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import apolloServerKoa from "apollo-server-koa";
import logger from "koa-pino-logger";

import passport from "./config/passport";
import authRoutes from "./routes/auth";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schemas";

import AuthAPI from "./graphql/datasources/auth";

const API_PORT = process.env.API_PORT || 1337;

const app = new Koa();
const pino = logger({
  prettyPrint: true
});
app.use(pino);

// The GraphQL datasources schema
const dataSources = () => ({
  authAPI: new AuthAPI()
});

// Apollo server
const server = new apolloServerKoa.ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});

// body parser
app.use(bodyParser());

const koaOptions = {
  origin: true,
  credentials: true
};
app.use(cors(koaOptions));

// Graphql Middleware
server.applyMiddleware({ app });

// authentication
app.use(passport.initialize());

// routes
app.use(authRoutes.routes());

// server
app.listen(API_PORT, () => {
  pino.logger.info(`Server listening on port: ${API_PORT}`);
  pino.logger.info(
    `🚀 Graphql Server ready at http://localhost:${API_PORT}${server.graphqlPath}`
  );
});
