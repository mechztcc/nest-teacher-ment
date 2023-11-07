import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserService } from '../services/create/create.service';
import { InformationsService } from '../services/informations/informations/informations.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly userInformationService: InformationsService,
  ) {}

  @Post()
  async create(@Body() payload: CreateUserDto): Promise<any> {
    return this.createUserService.execute(payload);
  }

  @Get('informations')
  @UseInterceptors(AuthorizationInterceptor)
  async info(@Headers() headers): Promise<any> {
    const { user } = headers;
    return await this.userInformationService.execute(user.id);
  }
}
