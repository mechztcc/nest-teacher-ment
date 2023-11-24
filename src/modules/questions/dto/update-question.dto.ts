import { IsNotEmpty, IsNumber, Max } from 'class-validator';

export class UpdateQuestionDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  topicId: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(3)
  pontuation: number;
}
