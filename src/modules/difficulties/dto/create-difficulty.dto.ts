import { IsNotEmpty, IsNumber, Max } from 'class-validator';

export class CreateDifficultyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  level: number;
}
