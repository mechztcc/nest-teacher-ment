import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ComputingLessonResultDto {
  @IsNumber()
  lessonId: number;

  @IsNotEmpty()
  answer: { alternativeId: number; isCorrect: boolean; questionId: number };

  @IsBoolean()
  done: boolean;
}
