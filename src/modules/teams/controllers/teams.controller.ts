import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AddMemberDto } from '../dtos/add-member.dto';
import { CreateTeamDto } from '../dtos/create-team.dto';
import { AddMemberService } from '../services/add-member/add-member.service';
import { CreateTeamService } from '../services/create-team/create-team.service';
import { IndexTeamService } from '../services/index/index.service';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { FindByOwnerService } from '../services/find-by-owner/find-by-owner.service';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly createTeam: CreateTeamService,
    private readonly addMember: AddMemberService,
    private readonly indexTeam: IndexTeamService,
    private readonly findTeamByOwner: FindByOwnerService,
  ) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  store(@Body() payload: CreateTeamDto, @Headers() headers) {
    const { user } = headers;
    return this.createTeam.execute(payload, user.id);
  }

  @Post('add-member')
  add(@Body() payload: AddMemberDto) {
    return this.addMember.execute(payload);
  }

  @Get()
  async index() {
    return this.indexTeam.execute();
  }

  @Get('owner')
  @UseInterceptors(AuthorizationInterceptor)
  async findByOwner(@Headers() headers) {
    const { user } = headers;

    return this.findTeamByOwner.execute(user.id);
  }
}
