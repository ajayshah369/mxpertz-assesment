// users/mappers/user.mapper.ts
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.models';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

export class UserMapper {
  static toEntity(userDto: CreateUserDto | UpdateUserDto): UserEntity {
    return {
      name: userDto.name,
      email: userDto.email,
      password: userDto.password,
      role: userDto.role,
    };
  }

  static toModel(userEntity: UserEntity): Partial<User> {
    return {
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
      role: userEntity.role,
    };
  }

  static modelToEntity(
    userModel: User,
    withPassword: boolean = false,
  ): UserEntity {
    return {
      id: userModel.id,
      name: userModel.name,
      email: userModel.email,
      role: userModel.role,
      password: withPassword ? userModel.password : undefined,
      is_active: userModel.is_active,
    };
  }
}
