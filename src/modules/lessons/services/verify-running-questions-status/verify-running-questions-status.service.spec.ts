import { Test, TestingModule } from '@nestjs/testing';
import { VerifyRunningQuestionsStatusService } from './verify-running-questions-status.service';

describe('VerifyRunningQuestionsStatusService', () => {
  let service: VerifyRunningQuestionsStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifyRunningQuestionsStatusService],
    }).compile();

    service = module.get<VerifyRunningQuestionsStatusService>(VerifyRunningQuestionsStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
