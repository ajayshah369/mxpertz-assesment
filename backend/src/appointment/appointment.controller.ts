import {
  Controller,
  UseGuards,
  Body,
  Post,
  Request,
  Get,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { UserJwtAuthGuard } from '../user-jwt/jwt-auth.guard';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@UseGuards(UserJwtAuthGuard)
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async createAppointment(
    @Body() body: CreateAppointmentDto,
    @Request() req: any,
  ) {
    const data = await this.appointmentService.create(body, req?.user?.id);

    return {
      message: 'Appointment created successfully',
      data: data,
    };
  }

  @Get()
  async getMyAppointments(@Request() req: any) {
    const data = await this.appointmentService.getMyAppointments(req.user.id);

    return {
      message: 'Appointments fetched successfully',
      data: data,
    };
  }
}
