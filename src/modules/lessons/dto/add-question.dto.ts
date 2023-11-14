import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddQuestionDto {
  @IsNotEmpty()
  @IsNumber()
  questionId: number;

  @IsNotEmpty()
  @IsNumber()
  lessonId: number;
}
