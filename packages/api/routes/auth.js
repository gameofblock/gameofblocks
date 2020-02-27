import Router from "koa-router";
import rasha from "rasha";
import uuid from "uuid-random";

import * as userRepository from "../db/user";
import passport from "../config/passport";
import * as jwtConfig from "../config/jwt";
import { generateToken } from "../utils/hasura";
import { sendPasswordRecoveryEmail } from "../services/mail";

const authenticate = (ctx, user, err, status, info) => {
  if (!user) {
    ctx.log.error(err, status, info);
    ctx.status = 401;
    ctx.body = {
      error: err
    };
  } else {
    const roles = ["user"]; // this.roles.map(el => el.name).concat("user")
    const token = generateToken(user.id, user.username, roles);

    ctx.body = {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        roles,
        token
      }
    };

    return ctx.login(user);
  }
  return undefined;
};

const router = new Router();

function manageErrors(err, ctx) {
  ctx.status = 400;
  const body = {
    code: err.code
  };

  if (process.env.NODE_ENV === "development" && err.detail) {
    body.detail = err.detail;
  }

  ctx.body = body;
}

router.post("/auth/forgot-password", async ctx => {
  const { email } = ctx.request.body;
  ctx.set("Content-Type", "application/json");

  const token = uuid();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    await userRepository.updateResetPassword(email, token, tomorrow);
    await sendPasswordRecoveryEmail(email, token);
    ctx.status = 200;
  } catch (err) {
    manageErrors(err, ctx);
  }
});

/**
 * GET /jwk
 * Sends the JWT key set
 */
router.get("/auth/jwk", async ctx => {
  const jwk = {
    ...rasha.importSync({ pem: jwtConfig.publicKey }),
    alg: "RS256",
    use: "sig",
    kid: jwtConfig.publicKey
  };
  const jwks = {
    keys: [jwk]
  };
  ctx.set("Content-Type", "application/json");
  ctx.response.body = `${JSON.stringify(jwks, null, 2)}`;
});

/**
 * POST /login
 * Sign in using username and password and returns JWT
 */
router.post("/auth/login", async ctx => {
  return passport.authenticate("local", (err, user, info, status) => {
    authenticate(ctx, user, err, status, info);
  })(ctx);
});

/**
 * POST /signup
 * Create a new local account
 */
router.post("/auth/signup", async ctx => {
  try {
    const { username, password } = ctx.request.body;
    await userRepository.create(username, password);

    return passport.authenticate("local", (err, user, info, status) =>
      authenticate(ctx, user, err, status, info)
    )(ctx);
  } catch (err) {
    manageErrors(err, ctx);
  }
  return ctx;
});

export default router;
