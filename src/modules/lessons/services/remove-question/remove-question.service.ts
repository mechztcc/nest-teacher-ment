import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/PrismaClient';
import { AddQuestionDto } from '../../dto/add-question.dto';

@Injectable()
export class RemoveQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  execute(payload: AddQuestionDto): Promise<any> {
    return this.prisma.questionsOnLessons.delete({
      where: {
        questionId_lessonId: {
          lessonId: payload.lessonId,
          questionId: payload.questionId,
        },
      },
    });
  }
}
