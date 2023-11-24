import { Module } from '@nestjs/common';
import { LessonsController } from './controllers/lessons.controller';
import { CreateLessonService } from './services/create-lesson/create-lesson.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FindLessonService } from './services/find-lesson/find.service';
import { IndexLessonsService } from './services/index-lessons/index-lessons.service';
import { AddQuestionService } from './services/add-question/add-question.service';
import { RemoveQuestionService } from './services/remove-question/remove-question.service';
import { OpenLessonService } from './services/open-lesson/open-lesson.service';
import { CloseLessonService } from './services/close-lesson/close-lesson.service';
import { FindOpenedByTeamService } from './services/find-opened-by-team/find-opened-by-team.service';
import { UpdateLessonService } from './services/update-lesson/update-lesson.service';

@Module({
  controllers: [LessonsController],
  providers: [CreateLessonService, FindLessonService, IndexLessonsService, AddQuestionService, RemoveQuestionService, OpenLessonService, CloseLessonService, FindOpenedByTeamService, UpdateLessonService],
  imports: [PrismaModule],
})
export class LessonsModule {}
