import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllFromProviderDTO from '../dtos/IFindAllFromProviderDTO';

export default interface IAppointmentsRepository {
  create(appointment: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllFromProvider(data: IFindAllFromProviderDTO): Promise<Appointment[]>;
}
