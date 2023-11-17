import {
  Body,
  Controller,
  Headers,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProfileService } from '../services/create-profile/create-profile.service';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly createProfileService: CreateProfileService) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  async store(@Headers() headers, @Body() body: CreateProfileDto) {
    const payload = {
      userId: headers.user.id,
      data: body,
    };
    return await this.createProfileService.execute(payload);
  }
}
