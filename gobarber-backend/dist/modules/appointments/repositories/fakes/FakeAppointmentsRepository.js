"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _dateFns = require("date-fns");

var _Appointment = _interopRequireDefault(require("../../infra/typeorm/entities/Appointment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsRepository {
  constructor() {
    this.appointments = [];
  }

  async create({
    user_id,
    provider_id,
    date
  }) {
    const appointment = new _Appointment.default();
    Object.assign(appointment, {
      id: (0, _uuidv.uuid)(),
      user_id,
      provider_id,
      date
    });
    this.appointments.push(appointment);
    return appointment;
  }

  async findByDate(date, provider_id) {
    const findAppointment = this.appointments.find(appointment => (0, _dateFns.isEqual)(appointment.date, date) && appointment.provider_id === provider_id);
    return findAppointment;
  }

  async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }) {
    const findAppointment = this.appointments.filter(appointment => appointment.provider_id === provider_id && (0, _dateFns.getMonth)(appointment.date) + 1 === month && (0, _dateFns.getYear)(appointment.date) === year);
    return findAppointment;
  }

  async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year
  }) {
    const findAppointment = this.appointments.filter(appointment => appointment.provider_id === provider_id && (0, _dateFns.getDate)(appointment.date) === day && (0, _dateFns.getMonth)(appointment.date) + 1 === month && (0, _dateFns.getYear)(appointment.date) === year);
    return findAppointment;
  }

}

var _default = AppointmentsRepository;
exports.default = _default;