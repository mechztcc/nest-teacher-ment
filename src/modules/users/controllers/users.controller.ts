import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserService } from '../services/create/create.service';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(@Body() payload: CreateUserDto): Promise<any> {
    return this.createUserService.execute(payload);
  }
}
