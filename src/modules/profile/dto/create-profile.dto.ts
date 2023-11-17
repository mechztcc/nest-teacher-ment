import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  phone: string;

  @IsString()
  organization: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;
}
