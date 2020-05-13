import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) throw new AppError('Invalid token');

    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user)
      throw new AppError('User Token is referencing a non-existing user');

    const createdTokenTime = userToken.created_at;
    const compareTime = addHours(createdTokenTime, 2);

    if (isAfter(Date.now(), compareTime)) throw new AppError('Expired token');

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}
