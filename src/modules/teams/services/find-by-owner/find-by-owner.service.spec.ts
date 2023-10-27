import { Test, TestingModule } from '@nestjs/testing';
import { FindByOwnerService } from './find-by-owner.service';

describe('FindByOwnerService', () => {
  let service: FindByOwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindByOwnerService],
    }).compile();

    service = module.get<FindByOwnerService>(FindByOwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
