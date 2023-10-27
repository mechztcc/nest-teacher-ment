import { Body, Controller, Post, Headers } from '@nestjs/common';
import { CreateLessonService } from '../services/create-lesson/create-lesson.service';
import { CreateLessonDto } from '../dto/create-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly createLesson: CreateLessonService) {}

  @Post()
  store(@Body() payload: CreateLessonDto, @Headers() headers) {
    const { user } = headers;
    return this.createLesson.execute(payload, user.id);
  }
}
