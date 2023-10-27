import { Module } from '@nestjs/common';
import { QuestionsController } from './controllers/questions.controller';
import { CreateQuestionService } from './services/create-question/create-question.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [QuestionsController],
  providers: [CreateQuestionService],
  imports: [PrismaModule],
})
export class QuestionsModule {}
