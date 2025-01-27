export class UserEntity {
  id?: string;
  name: string;
  email: string;
  is_active?: boolean;
  role: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
