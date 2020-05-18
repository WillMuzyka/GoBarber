<<<<<<< HEAD
import { startOfHour, isBefore, getHours } from 'date-fns';
=======
import { startOfHour, isBefore, getHours, format } from 'date-fns';
>>>>>>> development
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  user_id: string;
  provider_id: string;
  date: Date;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    provider_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (user_id === provider_id)
      throw new AppError("You can't make an appointment with yourself");

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't make an appointment at past dates");
    }

    const appointmentHour = getHours(appointmentDate);
    if (appointmentHour < 8 || appointmentHour > 17)
      throw new AppError('You can only make an appointment from 8am to 6pm');

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked!');
    }

    const appointment = await this.appointmentsRepository.create({
      user_id,
      provider_id,
      date: appointmentDate,
    });

    const formattedDate = format(
      appointmentDate,
      "'dia' dd/MM/yyyy 'às' HH:mm'h'",
    );

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento ${formattedDate}`,
    });

    await this.cacheProvider.invalidate(
      `provider_appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}
