import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddMemberDto } from '../dtos/add-member.dto';
import { CreateTeamDto } from '../dtos/create-team.dto';
import { AddMemberService } from '../services/add-member/add-member.service';
import { CreateTeamService } from '../services/create-team/create-team.service';
import { IndexTeamService } from '../services/index/index.service';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly createTeam: CreateTeamService,
    private readonly addMember: AddMemberService,
    private readonly indexTeam: IndexTeamService,
  ) {}

  @Post()
  store(@Body() payload: CreateTeamDto) {
    return this.createTeam.execute(payload);
  }

  @Post('add-member')
  add(@Body() payload: AddMemberDto) {
    return this.addMember.execute(payload);
  }

  @Get()
  async index() {
    return this.indexTeam.execute();
  }
}
