"use strict";

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
let fakeCacheProvider;
let fakeUsersRepository;
let listProviders;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    listProviders = new _ListProvidersService.default(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123'
    });
    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'john@tre.com',
      password: '456456'
    });
    const currentUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'john@qua.com',
      password: '789789'
    });
    const provider = await listProviders.execute({
      except_user_id: currentUser.id
    });
    expect(provider).toEqual([user1, user2]);
  });
});