import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './users.models';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userEntity = UserMapper.toEntity(createUserDto);
    const userModel = await this.userModel.create(
      UserMapper.toModel(userEntity),
    );
    return UserMapper.modelToEntity(userModel);
  }

  async findByEmail(
    email: string,
    withPassword: boolean = false,
  ): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ email });
    return user ? UserMapper.modelToEntity(user, withPassword) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.userModel.findById(id);
    return user ? UserMapper.modelToEntity(user) : null;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | null> {
    const result = await this.userModel.findOneAndUpdate(
      { _id: id },
      UserMapper.toModel(updateUserDto),
    );

    if (result[0] === 0) {
      return null;
    }

    const updatedUser = result[1][0];
    return updatedUser ? UserMapper.modelToEntity(updatedUser) : null;
  }

  async getDoctors(): Promise<UserEntity[]> {
    const users = await this.userModel.find({ role: 'doctor' });
    return users.map((user) => UserMapper.modelToEntity(user));
  }
}
