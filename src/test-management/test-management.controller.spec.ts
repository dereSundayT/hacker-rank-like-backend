import { Test, TestingModule } from '@nestjs/testing';
import { TestManagementController } from './test-management.controller';
import { TestManagementService } from './test-management.service';

describe('TestManagementController', () => {
  let controller: TestManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestManagementController],
      providers: [TestManagementService],
    }).compile();

    controller = module.get<TestManagementController>(TestManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
