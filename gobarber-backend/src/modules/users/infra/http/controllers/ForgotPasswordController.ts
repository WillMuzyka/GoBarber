import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const resetPassword = container.resolve(SendForgotPasswordEmailService);
    await resetPassword.execute({
      email,
    });

    return res.status(204).json();
  }
}
