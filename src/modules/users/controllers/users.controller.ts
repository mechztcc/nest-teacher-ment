import { Controller, Get, Post } from '@nestjs/common';
import { CreateUserService } from '../services/create/create.service';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Get()
  async create(): Promise<any> {
    return this.createUserService.store();
  }
}
