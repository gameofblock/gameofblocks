/* eslint-disable import/prefer-default-export */
import sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface SentMailOptions {
  sandboxEnable: boolean;
  success: boolean;
  error?: string;
}

export async function sendPasswordRecoveryEmail(
  email: string,
  token: string
): Promise<SentMailOptions> {
  if (!email) {
    throw new Error('email required');
  }

  const sandboxEnable = process.env.SENDGRID_API_KEY === '';

  const msg: MailDataRequired = {
    to: email,
    from: 'contact@gameofblocks.io',
    subject: 'Forgot password?',
    html: token,
    mailSettings: {
      sandboxMode: {
        enable: sandboxEnable,
      },
    },
  };

  try {
    await sgMail.send(msg);
    return {
      sandboxEnable,
      success: true,
    };
  } catch (err) {
    const { message = '' } = err;
    return {
      success: false,
      error: message,
      sandboxEnable,
    };
  }
}
