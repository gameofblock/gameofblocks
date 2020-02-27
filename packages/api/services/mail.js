/* eslint-disable import/prefer-default-export */
import sgMail from "@sendgrid/mail";

import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";

const path = `${dirname(fileURLToPath(import.meta.url))}/../../../.env`;
dotenv.config({ path });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailSettings = {
  sandbox_mode: {
    enable: process.env.NODE_ENV === "development"
  }
};

export async function sendPasswordRecoveryEmail(email, token) {
  const msg = {
    to: email,
    from: "contact@gameofblocks.io",
    subject: "Forgot password?",
    html: token,
    mail_settings: mailSettings
  };

  try {
    await sgMail.send(msg);
  } catch (err) {
    console.error(err.toString());
  }
}
