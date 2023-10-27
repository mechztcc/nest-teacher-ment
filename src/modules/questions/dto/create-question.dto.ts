import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsArray()
  alternatives: { title: string; isCorrect: boolean }[];

  @IsNotEmpty()
  @IsNumber()
  topic: number;
}
