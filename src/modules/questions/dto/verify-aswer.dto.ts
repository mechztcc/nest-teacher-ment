import { IsNotEmpty } from 'class-validator';

export class VerifyAswerDto {
  @IsNotEmpty()
  questionId: number;

  @IsNotEmpty()
  lessonId: number;

  @IsNotEmpty()
  alternativeId: number;
}
