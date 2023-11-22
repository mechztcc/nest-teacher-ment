import { Module } from '@nestjs/common';
import { QuestionsController } from './controllers/questions.controller';
import { CreateQuestionService } from './services/create-question/create-question.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FindQuestionService } from './services/find-question/find-question.service';
import { FindByTeacherService } from './services/find-by-teacher/find-by-teacher.service';
import { VerifyResponseService } from './services/verify-response/verify-response.service';

@Module({
  controllers: [QuestionsController],
  providers: [CreateQuestionService, FindQuestionService, FindByTeacherService, VerifyResponseService],
  imports: [PrismaModule],
})
export class QuestionsModule {}
