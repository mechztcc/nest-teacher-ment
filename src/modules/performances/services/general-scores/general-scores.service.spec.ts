import { Test, TestingModule } from '@nestjs/testing';
import { GeneralScoresService } from './general-scores.service';

describe('GeneralScoresService', () => {
  let service: GeneralScoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralScoresService],
    }).compile();

    service = module.get<GeneralScoresService>(GeneralScoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
