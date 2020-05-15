// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2050, 5, 18, 12, 0, 0).getTime();
    });
  });

  it("should be able to list the provider's appointments ", async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2050, 5, 18, 14, 0, 0),
      provider_id: 'providerId',
      user_id: 'userId',
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2050, 5, 18, 16, 0, 0),
      provider_id: 'providerId',
      user_id: 'userId',
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'providerId',
      day: 18,
      month: 6,
      year: 2050,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointment1, appointment2]),
    );
  });
});
