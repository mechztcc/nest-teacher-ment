import { IsArray, IsNotEmpty, IsNumber, Max } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsArray()
  alternatives: { title: string; isCorrect: boolean }[];

  @IsNotEmpty()
  @IsNumber()
  topic: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(3)
  pontuation: number;
}
