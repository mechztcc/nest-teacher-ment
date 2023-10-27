import {
  Body,
  Controller,
  Post,
  Headers,
  UseInterceptors,
  Get,
  Param,
} from '@nestjs/common';
import { CreateLessonService } from '../services/create-lesson/create-lesson.service';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { FindLessonService } from '../services/find-lesson/find.service';

@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly createLesson: CreateLessonService,
    private readonly findLesson: FindLessonService,
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
}
