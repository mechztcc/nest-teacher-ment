import { Controller, Get, Headers, UseInterceptors } from '@nestjs/common';
import { GeneralScoresService } from '../services/general-scores/general-scores.service';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';

@Controller('performances')
export class PerformancesController {
  constructor(private generalScoresService: GeneralScoresService) {}

  @Get()
  @UseInterceptors(AuthorizationInterceptor)
  async generalPerformanceByStudent(@Headers() headers) {
    const { user } = headers;

    return await this.generalScoresService.execute(user.id);
  }
}
