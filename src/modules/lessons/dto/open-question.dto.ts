import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OpenQuestionDto {
  @IsNotEmpty()
  @IsNumber()
  lessonId: number;

  @IsNotEmpty()
  @IsString()
  expiresAt: string;
}
