// import AppError from '@shared/errors/AppError';

<<<<<<< HEAD
=======
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
>>>>>>> development
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

<<<<<<< HEAD
=======
let fakeCacheProvider: FakeCacheProvider;
>>>>>>> development
let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
<<<<<<< HEAD
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
=======
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
>>>>>>> development
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
