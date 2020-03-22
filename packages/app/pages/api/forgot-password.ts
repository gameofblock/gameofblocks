/* eslint-disable @typescript-eslint/explicit-function-return-type */
import uuid from 'uuid-random';
import { NextApiRequest, NextApiResponse } from 'next';

import { updateResetPassword } from '../../db/user';
import { sendPasswordRecoveryEmail } from '../../services/mail';

export interface ForgotPasswordResponse {
  sended: boolean;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ForgotPasswordResponse>
) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    const token = uuid();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    await updateResetPassword(email, token, tomorrow);
    await sendPasswordRecoveryEmail(email, token);

    res.status(200).json({ sended: true });
  }
};
