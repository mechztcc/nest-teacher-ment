import { Module } from '@nestjs/common';
import { LessonsController } from './controllers/lessons.controller';
import { CreateLessonService } from './services/create-lesson/create-lesson.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [LessonsController],
  providers: [CreateLessonService],
  imports: [PrismaModule],
})
export class LessonsModule {}
