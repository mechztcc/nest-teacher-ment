import { Test, TestingModule } from '@nestjs/testing';
import { FindProfileService } from './find-profile.service';

describe('FindProfileService', () => {
  let service: FindProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindProfileService],
    }).compile();

    service = module.get<FindProfileService>(FindProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
