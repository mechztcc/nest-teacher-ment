import { Body, Controller, Post } from '@nestjs/common';
import { CreateTeamDto } from '../dtos/create-team.dto';
import { CreateTeamService } from '../services/create-team/create-team.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly createTeam: CreateTeamService) {}

  @Post()
  store(@Body() payload: CreateTeamDto) {
    return this.createTeam.execute(payload);
  }
}
