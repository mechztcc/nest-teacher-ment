import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { TeamsModule } from './modules/teams/teams.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { TopicModule } from './modules/topic/topic.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, TeamsModule, QuestionsModule, TopicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
