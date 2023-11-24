import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateLessonDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  difficultyId: number;
}
