// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider month availability', async () => {
    const startingHour = 8;
    const availableHours = Array.from(
      { length: 10 },
      (_, index) => index + startingHour,
    );

    const appointmentsPromise = availableHours.map(hour => {
      return fakeAppointmentsRepository.create({
        date: new Date(2050, 5, 17, hour, 0, 0),
        provider_id: 'userId',
      });
    });

    await Promise.all(appointmentsPromise);

    await fakeAppointmentsRepository.create({
      date: new Date(2050, 5, 18, 8, 0, 0),
      provider_id: 'userId',
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'userId',
      month: 6,
      year: 2050,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 16, available: true },
        { day: 17, available: false },
        { day: 18, available: true },
        { day: 19, available: true },
      ]),
    );
  });
});
