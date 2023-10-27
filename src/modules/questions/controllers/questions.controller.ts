import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { CreateQuestionService } from '../services/create-question/create-question.service';
import { FindQuestionService } from '../services/find-question/find-question.service';

@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly createQuestion: CreateQuestionService,
    private readonly findQuestion: FindQuestionService,
  ) {}

  @Post()
  store(@Body() payload: CreateQuestionDto) {
    return this.createQuestion.execute(payload);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.findQuestion.execute(Number(id));
  }
}
