import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { VerifyAswerDto } from '../dto/verify-aswer.dto';
import { CreateQuestionService } from '../services/create-question/create-question.service';
import { FindByTeacherService } from '../services/find-by-teacher/find-by-teacher.service';
import { FindQuestionService } from '../services/find-question/find-question.service';
import { UpdateQuestionService } from '../services/update-question/update-question.service';
import { VerifyResponseService } from '../services/verify-response/verify-response.service';

@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly createQuestion: CreateQuestionService,
    private readonly findQuestion: FindQuestionService,
    private readonly findByTeacherService: FindByTeacherService,
    private readonly verifyResponseService: VerifyResponseService,
    private readonly updateQuestionService: UpdateQuestionService,
  ) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  store(@Body() payload: CreateQuestionDto, @Headers() headers) {
    const user = headers.user;
    return this.createQuestion.execute(payload, user.id);
  }

  @Put()
  @UseInterceptors(AuthorizationInterceptor)
  update(@Body() payload: UpdateQuestionDto, @Headers() headers) {
    const user = headers.user;
    return this.updateQuestionService.execute(payload);
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
