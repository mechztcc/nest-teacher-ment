import { Test, TestingModule } from '@nestjs/testing';
import { CreateDifficultyService } from './create-difficulty.service';

describe('CreateDifficultyService', () => {
  let service: CreateDifficultyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateDifficultyService],
    }).compile();

    service = module.get<CreateDifficultyService>(CreateDifficultyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
