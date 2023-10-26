import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  role: Roles;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

enum Roles {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}
