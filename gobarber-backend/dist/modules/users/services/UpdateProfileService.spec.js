"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe Junior',
      email: 'john@doejunior.com'
    });
    expect(updatedUser.name).toBe('John Doe Junior');
    expect(updatedUser.email).toBe('john@doejunior.com');
  });
  it('should be able to update the user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe Junior',
      email: 'john@doejunior.com',
      old_password: '123123',
      password: 'asdasd'
    });
    expect(updatedUser.password).toBe('asdasd');
  });
  it('should not be able to update the profile of non-existing user', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'John Doe Junior',
      email: 'john@doejunior.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update user profile password informing wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Doe Junior',
      email: 'john@doejunior.com',
      old_password: 'wrong_password',
      password: 'asdasd'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update user profile password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Doe Junior',
      email: 'john@doejunior.com',
      password: 'asdasd'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update email to another existing user email', async () => {
    await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: 'donthackme'
    });
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'test@email.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});