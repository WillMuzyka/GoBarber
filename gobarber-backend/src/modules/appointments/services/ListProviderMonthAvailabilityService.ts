import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';
// import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    const daysInMonth = Array.from(
      { length: getDaysInMonth(month - 1) },
      (_, index) => index + 1,
    );

    const currentDay = new Date(Date.now());

    const availability = daysInMonth.map(day => {
      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      );

      const date = new Date(year, month - 1, day, 23, 59, 59);

      return {
        day,
        available: isAfter(date, currentDay) && appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}
