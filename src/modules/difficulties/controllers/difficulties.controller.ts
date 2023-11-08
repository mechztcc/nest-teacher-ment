import { Body, Controller, Post } from '@nestjs/common';
import { CreateDifficultyService } from '../services/create-difficulty/create-difficulty.service';
import { CreateDifficultyDto } from '../dto/create-difficulty.dto';

@Controller('difficulties')
export class DifficultiesController {
  constructor(private readonly createDifficult: CreateDifficultyService) {}

  @Post()
  async store(@Body() payload: CreateDifficultyDto) {
    return await this.createDifficult.execute(payload);
  }
}
