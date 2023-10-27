import { Module } from '@nestjs/common';
import { LessonsController } from './controllers/lessons.controller';
import { CreateLessonService } from './services/create-lesson/create-lesson.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FindLessonService } from './services/find-lesson/find.service';

@Module({
  controllers: [LessonsController],
  providers: [CreateLessonService, FindLessonService],
  imports: [PrismaModule],
})
export class LessonsModule {}
