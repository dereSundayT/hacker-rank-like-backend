import { Controller } from '@nestjs/common';
import { TestManagementService } from './test-management.service';

@Controller('test-management')
export class TestManagementController {
  constructor(private readonly testManagementService: TestManagementService) {}
}
