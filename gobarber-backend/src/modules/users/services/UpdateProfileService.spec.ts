import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe Junior',
      email: 'john@doejunior.com',
    });

    expect(updatedUser.name).toBe('John Doe Junior');
    expect(updatedUser.email).toBe('john@doejunior.com');
  });

  it('should be able to update the user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe Junior',
      email: 'john@doejunior.com',
      old_password: '123123',
      password: 'asdasd',
    });

    expect(updatedUser.password).toBe('asdasd');
  });

  it('should not be able to update the profile of non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'John Doe Junior',
        email: 'john@doejunior.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user profile password informing wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe Junior',
        email: 'john@doejunior.com',
        old_password: 'wrong_password',
        password: 'asdasd',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user profile password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe Junior',
        email: 'john@doejunior.com',
        password: 'asdasd',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update email to another existing user email', async () => {
    await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: 'donthackme',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'test@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
