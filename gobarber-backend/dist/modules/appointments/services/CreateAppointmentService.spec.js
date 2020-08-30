"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeAppointmentsRepository;
let fakeNotificationsRepository;
let createAppointment;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2050, 6, 17, 12, 0, 0).getTime();
    });
  });
  it('should be able to create new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(2050, 6, 17, 13, 0, 0),
      user_id: 'user_id',
      provider_id: 'provider_id'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  });
  it('should not be able to create two appointments at the same date', async () => {
    await createAppointment.execute({
      date: new Date(2050, 6, 17, 13, 0, 0),
      user_id: 'user_id',
      provider_id: 'provider_id'
    });
    await expect(createAppointment.execute({
      date: new Date(2050, 6, 17, 13, 0, 0),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create appointments at a past date', async () => {
    await expect(createAppointment.execute({
      date: new Date(2050, 6, 17, 11, 0, 0),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create appointment with same user as provider', async () => {
    await expect(createAppointment.execute({
      date: new Date(2050, 6, 17, 13, 0, 0),
      user_id: 'user_id',
      provider_id: 'user_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create appointment earlier than 8am or later than 6pm', async () => {
    await expect(createAppointment.execute({
      date: new Date(2050, 6, 18, 7, 0, 0),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2050, 6, 18, 18, 0, 0),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});