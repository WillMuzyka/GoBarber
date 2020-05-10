import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokenRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123',
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: 'asdasd',
      token,
    });

    const userUpdated = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('asdasd');
    expect(userUpdated?.password).toBe('asdasd');
  });

  it('should not be able to reset a password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: 'asdasd',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset a password of non-existing user', async () => {
    const { token } = await fakeUsersTokenRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: 'asdasd',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password after 2 hours from creation of token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123',
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: 'asdasd',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
