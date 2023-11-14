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
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { AddQuestionService } from '../services/add-question/add-question.service';
import { CreateLessonService } from '../services/create-lesson/create-lesson.service';
import { FindLessonService } from '../services/find-lesson/find.service';
import { IndexLessonsService } from '../services/index-lessons/index-lessons.service';
import { AddQuestionDto } from '../dto/add-question.dto';
import { RemoveQuestionService } from '../services/remove-question/remove-question.service';

@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly createLesson: CreateLessonService,
    private readonly findLesson: FindLessonService,
    private readonly indexLessons: IndexLessonsService,
    private readonly addQuestionService: AddQuestionService,
    private readonly removeQuestionService: RemoveQuestionService,
  ) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  store(@Body() payload: CreateLessonDto, @Headers() headers) {
    const { user } = headers;
    return this.createLesson.execute(payload, user.id);
  }

  @Post('add-question')
  addQuestion(@Body() payload: AddQuestionDto) {
    return this.addQuestionService.execute(payload);
  }

  @Put('remove-question')
  removeQuestion(@Body() payload: AddQuestionDto) {
    return this.removeQuestionService.execute(payload);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.findLesson.execute(Number(id));
  }

  @Get()
  @UseInterceptors(AuthorizationInterceptor)
  index(@Headers() headers) {
    const { user } = headers;
    return this.indexLessons.execute(user.id);
  }
}
