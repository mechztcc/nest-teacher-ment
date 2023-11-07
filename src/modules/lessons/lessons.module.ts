import { Module } from '@nestjs/common';
import { LessonsController } from './controllers/lessons.controller';
import { CreateLessonService } from './services/create-lesson/create-lesson.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FindLessonService } from './services/find-lesson/find.service';
import { IndexLessonsService } from './services/index-lessons/index-lessons.service';

@Module({
  controllers: [LessonsController],
  providers: [CreateLessonService, FindLessonService, IndexLessonsService],
  imports: [PrismaModule],
})
export class LessonsModule {}
