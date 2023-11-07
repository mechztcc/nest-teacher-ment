import { IsNotEmpty, IsNumber, Max } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  teamId: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  level: number;
}
