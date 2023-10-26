import { IsNotEmpty } from 'class-validator';

export class AddMemberDto {
  @IsNotEmpty()
  teamId: number;

  @IsNotEmpty()
  userId: number;
}
