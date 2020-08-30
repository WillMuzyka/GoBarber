"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderMonthAvailabilityService = _interopRequireDefault(require("./ListProviderMonthAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
let fakeAppointmentsRepository;
let listProviderMonthAvailability;
describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    listProviderMonthAvailability = new _ListProviderMonthAvailabilityService.default(fakeAppointmentsRepository);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2050, 5, 17, 12, 0, 0).getTime();
    });
  });
  it('should be able to list the provider month availability', async () => {
    const startingHour = 8;
    const availableHours = Array.from({
      length: 10
    }, (_, index) => index + startingHour);
    const appointmentsPromise = availableHours.map(hour => {
      return fakeAppointmentsRepository.create({
        date: new Date(2050, 5, 18, hour, 0, 0),
        user_id: 'userId',
        provider_id: 'providerId'
      });
    });
    await Promise.all(appointmentsPromise);
    await fakeAppointmentsRepository.create({
      date: new Date(2050, 5, 19, 8, 0, 0),
      user_id: 'userId',
      provider_id: 'providerId'
    });
    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'providerId',
      month: 6,
      year: 2050
    });
    expect(availability).toEqual(expect.arrayContaining([{
      day: 16,
      available: false
    }, {
      day: 17,
      available: true
    }, {
      day: 18,
      available: false
    }, {
      day: 19,
      available: true
    }, {
      day: 20,
      available: true
    }]));
  });
});