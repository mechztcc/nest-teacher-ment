import { Test, TestingModule } from '@nestjs/testing';
import { FindOpenedByTeamService } from './find-opened-by-team.service';

describe('FindOpenedByTeamService', () => {
  let service: FindOpenedByTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindOpenedByTeamService],
    }).compile();

    service = module.get<FindOpenedByTeamService>(FindOpenedByTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
