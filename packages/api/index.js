import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import logger from "koa-pino-logger";

import passport from "./config/passport";
import authRoutes from "./routes/auth";

const app = new Koa();
const pino = logger({
  prettyPrint: true
});
app.use(pino);

// body parser
app.use(bodyParser());

app.use(cors());

// authentication
app.use(passport.initialize());

// routes
app.use(authRoutes.routes());

const port = process.env.API_PORT || 4000;
app.listen(port);
