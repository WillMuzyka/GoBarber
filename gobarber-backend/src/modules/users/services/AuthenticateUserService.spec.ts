import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
<<<<<<< HEAD
=======
<<<<<<< HEAD
let createUser: CreateUserService;
=======
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
<<<<<<< HEAD
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
=======
<<<<<<< HEAD
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
=======
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123',
    });

    const response = await authenticateUser.execute({
      email: 'jhon@doe.com',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });

  it('should not be able to authenticate non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'jhon@doe.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
<<<<<<< HEAD
    await fakeUsersRepository.create({
=======
<<<<<<< HEAD
    await createUser.execute({
=======
    await fakeUsersRepository.create({
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123',
    });

    await expect(
      authenticateUser.execute({
        email: 'jhon@doe.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
