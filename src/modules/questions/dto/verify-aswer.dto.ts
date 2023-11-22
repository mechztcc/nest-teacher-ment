import { IsNotEmpty } from 'class-validator';

export class VerifyAswerDto {
  @IsNotEmpty()
  questionId: number;

  @IsNotEmpty()
  alternativeId: number;
}
