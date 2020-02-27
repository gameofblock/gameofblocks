/* eslint-disable import/prefer-default-export */
import jwt from "jsonwebtoken";

import * as jwtConfig from "../config/jwt";

function getHasuraClaims(id, roles) {
  return {
    "x-hasura-allowed-roles": roles,
    "x-hasura-default-role": "user",
    "x-hasura-user-id": `${id}`
  };
}

export function generateToken(id, username, roles) {
  const signOptions = {
    subject: id,
    expiresIn: "30d", // 30 days validity
    algorithm: "RS256"
  };
  const claim = {
    name: username,
    "https://hasura.io/jwt/claims": getHasuraClaims(id, roles)
  };
  return jwt.sign(claim, jwtConfig.key, signOptions);
}
