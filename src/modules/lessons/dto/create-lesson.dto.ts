import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  teamId: number;
}
