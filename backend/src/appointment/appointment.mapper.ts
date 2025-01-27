// users/mappers/user.mapper.ts
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './appointment.model';
import { AppointmentEntity } from './entities/appointment.entity';
import { ObjectId } from 'mongodb';

export class AppointmentMapper {
  static toEntity(appointmentDto: CreateAppointmentDto): AppointmentEntity {
    return {
      date_time: appointmentDto.date_time,
      doctor: appointmentDto.doctor,
    };
  }

  static toModel(appointmentEntity: AppointmentEntity): Partial<Appointment> {
    return {
      date_time: new Date(appointmentEntity.date_time),
      doctor: new ObjectId(appointmentEntity.doctor.toString()),
      patient: new ObjectId(appointmentEntity.patient.toString()),
    };
  }
}
