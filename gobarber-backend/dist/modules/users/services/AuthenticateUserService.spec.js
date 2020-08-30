"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let authenticateUser;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    authenticateUser = new _AuthenticateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123'
    });
    const response = await authenticateUser.execute({
      email: 'jhon@doe.com',
      password: '123123'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });
  it('should not be able to authenticate non existing user', async () => {
    await expect(authenticateUser.execute({
      email: 'jhon@doe.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123'
    });
    await expect(authenticateUser.execute({
      email: 'jhon@doe.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});