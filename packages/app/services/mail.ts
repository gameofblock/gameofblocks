import sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendPasswordRecoveryEmail(email, token) {
  const msg: MailDataRequired = {
    to: email,
    from: 'contact@gameofblocks.io',
    subject: 'Forgot password?',
    html: token,
    mailSettings: {
      sandboxMode: {
        enable: process.env.NODE_ENV === 'development'
      }
    }
  };

  try {
    await sgMail.send(msg);
  } catch (err) {
    console.error(err.toString());
  }
}
