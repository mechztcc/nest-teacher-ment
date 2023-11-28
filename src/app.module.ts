import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DifficultiesModule } from './modules/difficulties/difficulties.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProfileModule } from './modules/profile/profile.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { TeamsModule } from './modules/teams/teams.module';
import { TopicModule } from './modules/topic/topic.module';
import { UsersModule } from './modules/users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './shared/services/tasks/tasks.service';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    TeamsModule,
    QuestionsModule,
    TopicModule,
    LessonsModule,
    DifficultiesModule,
    ProfileModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
