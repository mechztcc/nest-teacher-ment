import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { CreateProfileService } from '../services/create-profile/create-profile.service';
import { FindProfileService } from '../services/find-profile/find-profile.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly createProfileService: CreateProfileService,
    private readonly findProfile: FindProfileService,
  ) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  async store(@Headers() headers, @Body() body: CreateProfileDto) {
    const payload = {
      userId: headers.user.id,
      data: body,
    };
    return await this.createProfileService.execute(payload);
  }

  @Get()
  @UseInterceptors(AuthorizationInterceptor)
  find(@Headers() headers) {
    return this.findProfile.execute(headers.user.id);
  }
}
