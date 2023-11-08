import { Test, TestingModule } from '@nestjs/testing';
import { IndexDifficultiesService } from './index-difficulties.service';

describe('IndexDifficultiesService', () => {
  let service: IndexDifficultiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndexDifficultiesService],
    }).compile();

    service = module.get<IndexDifficultiesService>(IndexDifficultiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
