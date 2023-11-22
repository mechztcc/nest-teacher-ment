import { Test, TestingModule } from '@nestjs/testing';
import { VerifyResponseService } from './verify-response.service';

describe('VerifyResponseService', () => {
  let service: VerifyResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifyResponseService],
    }).compile();

    service = module.get<VerifyResponseService>(VerifyResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
