import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { CreateLessonService } from '../services/create-lesson/create-lesson.service';
import { FindLessonService } from '../services/find-lesson/find.service';
import { IndexLessonsService } from '../services/index-lessons/index-lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly createLesson: CreateLessonService,
    private readonly findLesson: FindLessonService,
    private readonly indexLessons: IndexLessonsService,
  ) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  store(@Body() payload: CreateLessonDto, @Headers() headers) {
    const { user } = headers;
    return this.createLesson.execute(payload, user.id);
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
