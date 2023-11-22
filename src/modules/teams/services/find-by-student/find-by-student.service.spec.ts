import { Test, TestingModule } from '@nestjs/testing';
import { FindByStudentService } from './find-by-student.service';

describe('FindByStudentService', () => {
  let service: FindByStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindByStudentService],
    }).compile();

    service = module.get<FindByStudentService>(FindByStudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
