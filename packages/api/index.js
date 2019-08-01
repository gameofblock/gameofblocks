import Koa from "koa";
import * as cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import pino from "pino";
import { ApolloServer } from "apollo-server-koa";

import passport from "./config/passport";
import authRoutes from "./routes/auth";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schemas";

const logger = pino();
const app = new Koa();
const PORT = process.env.PORT || 1337;

// Apollo server
const server = new ApolloServer({ resolvers, typeDefs });

// body parser
app.use(bodyParser());
app.use(cors());

// Graphql Middleware
server.applyMiddleware({ app });

// authentication
app.use(passport.initialize());

// routes
app.use(authRoutes.routes());

// server
app.listen(PORT, () => {
  logger.info(`Server listening on port: ${PORT}`);
  logger.info(
    `🚀 Graphql Server ready at http://localhost:4001${server.graphqlPath}`
  );
});
