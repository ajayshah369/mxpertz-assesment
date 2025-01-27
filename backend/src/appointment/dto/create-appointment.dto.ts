import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  doctor: string;

  @IsDateString()
  @IsNotEmpty()
  date_time: string;
}
