import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { CreateQuestionService } from '../services/create-question/create-question.service';
import { FindQuestionService } from '../services/find-question/find-question.service';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';

@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly createQuestion: CreateQuestionService,
    private readonly findQuestion: FindQuestionService,
  ) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  store(@Body() payload: CreateQuestionDto, @Headers() headers) {
    const user = headers.user;
    return this.createQuestion.execute(payload, user.id);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.findQuestion.execute(Number(id));
  }
}
