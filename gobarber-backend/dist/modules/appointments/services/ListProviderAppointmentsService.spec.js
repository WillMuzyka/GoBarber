"use strict";

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderAppointmentsService = _interopRequireDefault(require("./ListProviderAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
let fakeCacheProvider;
let fakeAppointmentsRepository;
let listProviderAppointments;
describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    listProviderAppointments = new _ListProviderAppointmentsService.default(fakeAppointmentsRepository, fakeCacheProvider);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2050, 5, 18, 12, 0, 0).getTime();
    });
  });
  it("should be able to list the provider's appointments ", async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      date: new Date(2050, 5, 18, 14, 0, 0),
      provider_id: 'providerId',
      user_id: 'userId'
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      date: new Date(2050, 5, 18, 16, 0, 0),
      provider_id: 'providerId',
      user_id: 'userId'
    });
    const appointments = await listProviderAppointments.execute({
      provider_id: 'providerId',
      day: 18,
      month: 6,
      year: 2050
    });
    expect(appointments).toEqual(expect.arrayContaining([appointment1, appointment2]));
  });
});