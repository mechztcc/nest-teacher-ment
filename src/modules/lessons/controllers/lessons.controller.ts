import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorizationInterceptor } from 'src/shared/interceptors/authorization/authorization.interceptor';
import { AddQuestionDto } from '../dto/add-question.dto';
import { ComputingLessonResultDto } from '../dto/computing-lesson-result.dto';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { OpenQuestionDto } from '../dto/open-question.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { AddQuestionService } from '../services/add-question/add-question.service';
import { CloseLessonService } from '../services/close-lesson/close-lesson.service';
import { ComputingResultService } from '../services/computing-result/computing-result.service';
import { CreateLessonService } from '../services/create-lesson/create-lesson.service';
import { FindLessonService } from '../services/find-lesson/find.service';
import { FindOpenedByTeamService } from '../services/find-opened-by-team/find-opened-by-team.service';
import { IndexLessonsService } from '../services/index-lessons/index-lessons.service';
import { OpenLessonService } from '../services/open-lesson/open-lesson.service';
import { RemoveQuestionService } from '../services/remove-question/remove-question.service';
import { UpdateLessonService } from '../services/update-lesson/update-lesson.service';
import { CompleteLessonService } from '../services/complete-lesson/complete-lesson.service';

@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly createLesson: CreateLessonService,
    private readonly findLesson: FindLessonService,
    private readonly indexLessons: IndexLessonsService,
    private readonly addQuestionService: AddQuestionService,
    private readonly removeQuestionService: RemoveQuestionService,
    private readonly openLessonService: OpenLessonService,
    private readonly closeLessonService: CloseLessonService,
    private readonly findOpenedByTeamService: FindOpenedByTeamService,
    private readonly updateLessonService: UpdateLessonService,
    private readonly computingResultService: ComputingResultService,
    private readonly completeLessonService: CompleteLessonService,
  ) {}

  @Post()
  @UseInterceptors(AuthorizationInterceptor)
  store(@Body() payload: CreateLessonDto, @Headers() headers) {
    const { user } = headers;
    return this.createLesson.execute(payload, user.id);
  }

  @Put('update/:id')
  @UseInterceptors(AuthorizationInterceptor)
  update(@Body() payload: UpdateLessonDto, @Param('id') id: string) {
    return this.updateLessonService.execute({
      data: payload,
      lessonId: Number(id),
    });
  }

  @Post('add-question')
  addQuestion(@Body() payload: AddQuestionDto) {
    return this.addQuestionService.execute(payload);
  }

  @Post('computing-result')
  @UseInterceptors(AuthorizationInterceptor)
  computingResult(
    @Body() payload: ComputingLessonResultDto,
    @Headers() headers,
  ) {
    const { user } = headers;

    return this.computingResultService.execute({
      data: payload,
      userId: user.id,
    });
  }

  @Put('remove-question')
  removeQuestion(@Body() payload: AddQuestionDto) {
    return this.removeQuestionService.execute(payload);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.findLesson.execute(Number(id));
  }

  @Get('complete-lesson/:id')
  @UseInterceptors(AuthorizationInterceptor)
  completeLesson(@Param('id') id: string) {
    return this.completeLessonService.execute(Number(id));
  }

  @Get('student/find-by-user')
  @UseInterceptors(AuthorizationInterceptor)
  findOpenedByTeam(@Headers() headers) {
    const { user } = headers;

    return this.findOpenedByTeamService.execute(user.id);
  }

  @Get()
  @UseInterceptors(AuthorizationInterceptor)
  index(@Headers() headers) {
    const { user } = headers;
    return this.indexLessons.execute(user.id);
  }

  @Put('open')
  @UseInterceptors(AuthorizationInterceptor)
  openLesson(@Headers() headers, @Body() payload: OpenQuestionDto) {
    const { user } = headers;
    return this.openLessonService.execute({
      expiresAt: payload.expiresAt,
      lessonId: payload.lessonId,
      userId: user.id,
    });
  }

  @Patch('close/:id')
  @UseInterceptors(AuthorizationInterceptor)
  closeLesson(@Headers() headers, @Param('id') id: string) {
    const { user } = headers;
    return this.closeLessonService.execute({
      lessonId: Number(id),
      userId: user.id,
    });
  }
}
