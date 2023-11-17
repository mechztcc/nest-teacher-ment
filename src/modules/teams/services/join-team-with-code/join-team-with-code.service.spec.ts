import { Test, TestingModule } from '@nestjs/testing';
import { JoinTeamWithCodeService } from './join-team-with-code.service';

describe('JoinTeamWithCodeService', () => {
  let service: JoinTeamWithCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinTeamWithCodeService],
    }).compile();

    service = module.get<JoinTeamWithCodeService>(JoinTeamWithCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
