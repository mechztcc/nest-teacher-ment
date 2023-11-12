import { Test, TestingModule } from '@nestjs/testing';
import { FindByTeacherService } from './find-by-teacher.service';

describe('FindByTeacherService', () => {
  let service: FindByTeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindByTeacherService],
    }).compile();

    service = module.get<FindByTeacherService>(FindByTeacherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
