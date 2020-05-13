// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2050, 5, 18, 12, 0, 0).getTime();
    });
  });

  it('should be able to list the provider day availability', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2050, 5, 18, 14, 0, 0),
      provider_id: 'providerId',
      user_id: 'userId',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2050, 5, 18, 16, 0, 0),
      provider_id: 'providerId',
      user_id: 'userId',
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'providerId',
      day: 18,
      month: 6,
      year: 2050,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: true },
        { hour: 16, available: false },
        { hour: 17, available: true },
      ]),
    );
  });
});
