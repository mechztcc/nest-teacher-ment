import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserService } from '../services/create/create.service';
import { InformationsService } from '../services/informations/informations/informations.service';
import { FindByEmailService } from '../services/find-by-email/find-by-email.service';
import { FindByIdService } from '../services/find-by-id/find-by-id.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly userInformationService: InformationsService,
    private readonly findByEmailService: FindByEmailService,
    private readonly findByIdService: FindByIdService,
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

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.findByEmailService.execute(email);
  }

  @Get(':id/details')
  async findById(@Param('id') id: string) {
    return this.findByIdService.execute(Number(id));
  }

}
