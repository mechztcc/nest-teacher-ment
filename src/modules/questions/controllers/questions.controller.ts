import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  Headers,
  Delete,
} from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { CreateQuestionService } from '../services/create-question/create-question.service';
import { FindQuestionService } from '../services/find-question/find-question.service';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { FindByTeacherService } from '../services/find-by-teacher/find-by-teacher.service';
import { VerifyResponseService } from '../services/verify-response/verify-response.service';
import { VerifyAswerDto } from '../dto/verify-aswer.dto';

@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly createQuestion: CreateQuestionService,
    private readonly findQuestion: FindQuestionService,
    private readonly findByTeacherService: FindByTeacherService,
    private readonly verifyResponseService: VerifyResponseService,
  ) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  store(@Body() payload: CreateQuestionDto, @Headers() headers) {
    const user = headers.user;
    return this.createQuestion.execute(payload, user.id);
  }

  @Get('owner')
  @UseInterceptors(AuthorizationInterceptor)
  findByTeacher(@Headers() headers) {
    const { user } = headers;
    return this.findByTeacherService.execute(user.id);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.findQuestion.execute(Number(id));
  }

  @Post('verify-answer')
  @UseInterceptors(AuthorizationInterceptor)
  verifyResponse(@Headers() headers, @Body() payload: VerifyAswerDto) {
    const { user } = headers;

    return this.verifyResponseService.execute({
      data: payload,
      userId: user.id,
    });
  }
}
