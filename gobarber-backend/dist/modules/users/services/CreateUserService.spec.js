"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeUsersRepository;
let fakeHashProvider;
let createUser;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123'
    });
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
  });
  it('should not be able to create two users with the same email ', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123'
    });
    await expect(createUser.execute({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});