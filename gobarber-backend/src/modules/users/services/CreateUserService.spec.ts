import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
  });

  it('should not be able to create two users with the same email ', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jhon@doe.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
