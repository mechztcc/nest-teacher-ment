import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDifficultyDto } from '../dto/create-difficulty.dto';
import { CreateDifficultyService } from '../services/create-difficulty/create-difficulty.service';
import { IndexDifficultiesService } from '../services/index-difficulties/index-difficulties.service';

@Controller('difficulties')
export class DifficultiesController {
  constructor(private readonly createDifficult: CreateDifficultyService, private readonly indexDifficulties: IndexDifficultiesService) {}

  @Post()
  async store(@Body() payload: CreateDifficultyDto) {
    return await this.createDifficult.execute(payload);
  }

  @Get()
  async index() {
    return await this.indexDifficulties.execute()
  }
}
