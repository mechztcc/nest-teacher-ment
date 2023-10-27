import { Module } from '@nestjs/common';
import { QuestionsController } from './controllers/questions.controller';
import { CreateQuestionService } from './services/create-question/create-question.service';
import { PrismaModule } from '../prisma/prisma.module';
import { FindQuestionService } from './services/find-question/find-question.service';

@Module({
  controllers: [QuestionsController],
  providers: [CreateQuestionService, FindQuestionService],
  imports: [PrismaModule],
})
export class QuestionsModule {}
