// import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'john@tre.com',
      password: '456456',
    });

    const currentUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'john@qua.com',
      password: '789789',
    });

    const provider = await listProviders.execute({
      except_user_id: currentUser.id,
    });

    expect(provider).toEqual([user1, user2]);
  });
});
