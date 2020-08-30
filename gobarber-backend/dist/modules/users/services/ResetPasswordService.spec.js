"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUsersTokenRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersTokenRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUsersTokenRepository;
let fakeHashProvider;
let resetPassword;
describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUsersTokenRepository = new _FakeUsersTokenRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPassword = new _ResetPasswordService.default(fakeUsersRepository, fakeUsersTokenRepository, fakeHashProvider);
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123'
    });
    const {
      token
    } = await fakeUsersTokenRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassword.execute({
      password: 'asdasd',
      token
    });
    const userUpdated = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('asdasd');
    expect(userUpdated === null || userUpdated === void 0 ? void 0 : userUpdated.password).toBe('asdasd');
  });
  it('should not be able to reset a password with non-existing token', async () => {
    await expect(resetPassword.execute({
      token: 'non-existing-token',
      password: 'asdasd'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset a password of non-existing user', async () => {
    const {
      token
    } = await fakeUsersTokenRepository.generate('non-existing-user');
    await expect(resetPassword.execute({
      token,
      password: 'asdasd'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password after 2 hours from creation of token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123'
    });
    const {
      token
    } = await fakeUsersTokenRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPassword.execute({
      password: 'asdasd',
      token
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});