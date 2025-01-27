import { Controller, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserJwtAuthGuard } from '../user-jwt/jwt-auth.guard';

@UseGuards(UserJwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get('doctors')
  async getDoctors() {
    const data = await this.usersService.getDoctors();

    return {
      message: 'Doctors fetched successfully',
      data: data,
    };
  }
}
