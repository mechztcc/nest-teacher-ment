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
import { AddMemberDto } from '../dtos/add-member.dto';
import { CreateTeamDto } from '../dtos/create-team.dto';
import { AddMemberService } from '../services/add-member/add-member.service';
import { CreateTeamService } from '../services/create-team/create-team.service';
import { FindByOwnerService } from '../services/find-by-owner/find-by-owner.service';
import { FindService } from '../services/find/find.service';
import { IndexTeamService } from '../services/index/index.service';
import { JoinTeamWithCodeService } from '../services/join-team-with-code/join-team-with-code.service';
import { FindByStudentService } from '../services/find-by-student/find-by-student.service';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly createTeam: CreateTeamService,
    private readonly addMember: AddMemberService,
    private readonly indexTeam: IndexTeamService,
    private readonly findTeamByOwner: FindByOwnerService,
    private readonly findById: FindService,
    private readonly joinTeamWithCode: JoinTeamWithCodeService,
    private readonly findByStudentService: FindByStudentService
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

  @Get('/details/:id')
  @UseInterceptors(AuthorizationInterceptor)
  async find(@Headers() headers, @Param('id') id: string) {
    const { user } = headers;
    return this.findById.execute(user.id, Number(id));
  }

  @Get('owner')
  @UseInterceptors(AuthorizationInterceptor)
  async findByOwner(@Headers() headers) {
    const { user } = headers;

    return this.findTeamByOwner.execute(user.id);
  }

  @Post('join/:code')
  @UseInterceptors(AuthorizationInterceptor)
  async joinWithCode(@Headers() headers, @Param('code') code: string) {
    const { user } = headers;

    return this.joinTeamWithCode.execute({ code: code, userId: user.id });
  }


  @Get('student')
  @UseInterceptors(AuthorizationInterceptor)
  async findByStudent(@Headers() headers) {
    const { user } = headers;

    return this.findByStudentService.execute(user.id);

  }
}
