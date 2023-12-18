import { Test, TestingModule } from '@nestjs/testing';
import { ComputingResultService } from './computing-result.service';

describe('ComputingResultService', () => {
  let service: ComputingResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComputingResultService],
    }).compile();

    service = module.get<ComputingResultService>(ComputingResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
