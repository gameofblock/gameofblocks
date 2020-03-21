import uuid from 'uuid-random';

import { updateResetPassword } from '../../db/user';
import { sendPasswordRecoveryEmail } from '../../services/mail';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    const token = uuid();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    await updateResetPassword(email, token, tomorrow);
    await sendPasswordRecoveryEmail(email, token);
    res.status(200);
  }
};
