import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TeamsController } from './controllers/teams.controller';
import { CreateTeamService } from './services/create-team/create-team.service';
import { AddMemberService } from './services/add-member/add-member.service';
import { IndexTeamService } from './services/index/index.service';
import { FindByOwnerService } from './services/find-by-owner/find-by-owner.service';

@Module({
  providers: [CreateTeamService, AddMemberService, IndexTeamService, FindByOwnerService],
  controllers: [TeamsController],
  imports: [PrismaModule],
})
export class TeamsModule {}
