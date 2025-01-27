import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { Appointment } from './appointment.model';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentMapper } from './appointment.mapper';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
    patient: string,
  ): Promise<Appointment> {
    const appointmentEntity = AppointmentMapper.toEntity(createAppointmentDto);
    appointmentEntity.patient = patient;
    const appointment = await this.appointmentModel.create(
      AppointmentMapper.toModel(appointmentEntity),
    );
    return appointment;
  }

  async getMyAppointments(id: string): Promise<Appointment[]> {
    const appointments = await this.appointmentModel
      .find({
        $or: [{ doctor: new ObjectId(id) }, { patient: new ObjectId(id) }],
      })
      .populate('doctor', 'id name email role')
      .populate('patient', 'id name email role');

    return appointments;
  }
}
