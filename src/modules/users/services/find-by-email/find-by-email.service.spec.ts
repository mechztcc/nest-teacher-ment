import { Test, TestingModule } from '@nestjs/testing';
import { FindByEmailService } from './find-by-email.service';

describe('FindByEmailService', () => {
  let service: FindByEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindByEmailService],
    }).compile();

    service = module.get<FindByEmailService>(FindByEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
