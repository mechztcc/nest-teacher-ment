import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { AddQuestionDto } from '../../dto/add-question.dto';

@Injectable()
export class AddQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(payload: AddQuestionDto): Promise<any> {
    const questionExists = await this.prisma.question.findUnique({
      where: { id: payload.questionId },
    });
    if (!questionExists) {
      throw new NotFoundException('Provided question has not found.');
    }

    const lessonExists = await this.prisma.lesson.findUnique({
      where: { id: payload.lessonId },
    });
    if (!lessonExists) {
      throw new NotFoundException('Provided lesson has not found.');
    }

    const questionOnLessonsExists =
      await this.prisma.questionsOnLessons.findUnique({
        where: {
          questionId_lessonId: {
            lessonId: payload.lessonId,
            questionId: payload.questionId,
          },
        },
      });

    if (questionOnLessonsExists) {
      throw new ConflictException(
        'Provided question is already registered on this lesson',
      );
    }

    const questionOnLesson = await this.prisma.questionsOnLessons.create({
      data: { lessonId: payload.lessonId, questionId: payload.questionId },
    });

    return questionOnLesson;
  }
}
