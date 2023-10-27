import {
  Body,
  Controller,
  Post,
  Headers,
  UseInterceptors,
} from '@nestjs/common';
import { CreateLessonService } from '../services/create-lesson/create-lesson.service';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly createLesson: CreateLessonService) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  store(@Body() payload: CreateLessonDto, @Headers() headers) {
    const { user } = headers;
    return this.createLesson.execute(payload, user.id);
  }
}
