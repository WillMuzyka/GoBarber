import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2050, 6, 17, 12, 0, 0).getTime();
    });
  });

  it('should be able to create new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(2050, 6, 17, 13, 0, 0),
      user_id: 'user_id',
      provider_id: 'provider_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  });

  it('should not be able to create two appointments at the same date', async () => {
    await createAppointment.execute({
      date: new Date(2050, 6, 17, 13, 0, 0),
      user_id: 'user_id',
      provider_id: 'provider_id',
    });

    await expect(
      createAppointment.execute({
        date: new Date(2050, 6, 17, 13, 0, 0),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointments at a past date', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2050, 6, 17, 11, 0, 0),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointment with same user as provider', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2050, 6, 17, 13, 0, 0),
        user_id: 'user_id',
        provider_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create appointment earlier than 8am or later than 6pm', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2050, 6, 18, 7, 0, 0),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2050, 6, 18, 18, 0, 0),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
