import { Body, Controller, Post } from '@nestjs/common';
import { CreateQuestionService } from '../services/create-question/create-question.service';
import { CreateQuestionDto } from '../dto/create-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly createQuestion: CreateQuestionService) {}

  @Post()
  store(@Body() payload: CreateQuestionDto) {
    return this.createQuestion.execute(payload);
  }
}
