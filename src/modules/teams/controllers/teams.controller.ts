import { Body, Controller, Post } from '@nestjs/common';
import { AddMemberDto } from '../dtos/add-member.dto';
import { CreateTeamDto } from '../dtos/create-team.dto';
import { AddMemberService } from '../services/add-member/add-member.service';
import { CreateTeamService } from '../services/create-team/create-team.service';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly createTeam: CreateTeamService,
    private readonly addMember: AddMemberService,
  ) {}

  @Post()
  store(@Body() payload: CreateTeamDto) {
    return this.createTeam.execute(payload);
  }

  @Post('add-member')
  add(@Body() payload: AddMemberDto) {
    return this.addMember.execute(payload);
  }
}
