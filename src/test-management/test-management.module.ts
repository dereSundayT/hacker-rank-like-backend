import { Global, Module } from "@nestjs/common";
import { TestManagementService } from './test-management.service';
import { TestManagementController } from './test-management.controller';


@Global()
@Module({
  controllers: [TestManagementController],
  providers: [TestManagementService],
  exports:[TestManagementService]
})
export class TestManagementModule {}
