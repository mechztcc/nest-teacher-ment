import { Test, TestingModule } from '@nestjs/testing';
import { AddMemberService } from './add-member.service';

describe('AddMemberService', () => {
  let service: AddMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddMemberService],
    }).compile();

    service = module.get<AddMemberService>(AddMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
