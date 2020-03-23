/* eslint-disable @typescript-eslint/explicit-function-return-type */
import uuid from 'uuid-random';
import { NextApiRequest, NextApiResponse } from 'next';

import { updateResetPassword, findByEmail } from '../../../db/user';
import { sendPasswordRecoveryEmail } from '../../../services/mail';

export interface ForgotPasswordResponse {
  sended: boolean;
  error?: string;
  sandboxEnable?: boolean;
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

    try {
      const user = await findByEmail(email);
      if (!user) {
        throw new Error('email is not valid');
      }

      await updateResetPassword(email, token, tomorrow);
      const { sandboxEnable } = await sendPasswordRecoveryEmail(email, token);
      res.status(200).json({ sended: true, sandboxEnable });
    } catch (err) {
      res.status(500).json({
        sended: false,
        error: !err || !err.message ? '' : err.message
      });
    }
  }
};
