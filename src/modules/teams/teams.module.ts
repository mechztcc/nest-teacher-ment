import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TeamsController } from './controllers/teams.controller';
import { CreateTeamService } from './services/create-team/create-team.service';

@Module({
  providers: [CreateTeamService],
  controllers: [TeamsController],
  imports: [PrismaModule],
})
export class TeamsModule {}
