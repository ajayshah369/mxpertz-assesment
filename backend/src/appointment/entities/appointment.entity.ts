import { UserEntity } from 'src/users/entities/user.entity';

export class AppointmentEntity {
  id?: string;
  doctor: UserEntity | string;
  patient?: UserEntity | string;
  date_time: string;
}
