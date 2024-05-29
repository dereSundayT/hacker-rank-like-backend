import { Test, TestingModule } from '@nestjs/testing';
import { TestManagementService } from './test-management.service';

describe('TestManagementService', () => {
  let service: TestManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestManagementService],
    }).compile();

    service = module.get<TestManagementService>(TestManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
