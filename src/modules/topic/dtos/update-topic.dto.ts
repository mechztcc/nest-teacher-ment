

import { IsNotEmpty } from 'class-validator';

export class UpdateTopicDto {
  @IsNotEmpty()
  name: string;
}
