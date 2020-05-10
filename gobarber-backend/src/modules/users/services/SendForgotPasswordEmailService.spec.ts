import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUsersTokenRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover the password sending the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'jhon@doe.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able send email to non-existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'jhon@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUsersTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'jhon@doe.com',
    });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
