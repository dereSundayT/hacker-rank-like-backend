import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { IsAdminGuard } from '../auth/guard/is-admin.guard';
import { Response } from 'express';
import { GetUserDetaillsDecorator } from '../auth/decorators/get-user-detaills.decorator';
import { UserModel } from '../_utils/model';
import { handleResponse, logError } from '../_utils/helper.utils';
import { msgs } from '../_utils/msg.utils';
import { TestManagementService } from '../test-management/test-management.service';

@UseGuards(IsAdminGuard)
@UseGuards(AuthGuard)
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly testManagementService: TestManagementService,
  ) {}

  /**
   * get all user profile with test details only
   * @param res
   * @param user
   */
  @ApiOperation({ description: 'get all user profile with test details only' })
  @Get('users')
  async getUsers(
    @Res() res: Response,
    @GetUserDetaillsDecorator() user: UserModel,
  ) {
    try {
      //get attempted test
      //prettier-ignore
      const respData = await this.testManagementService.getTestForUserService(user)
      //prettier-ignore
      return handleResponse(res,respData.data,respData.message,respData.status?200:400,respData.status);
    } catch (e: any) {
      await logError(e);
      return handleResponse(res, null, msgs.general_err, 400, false);
    }
  }
  //view user details
}
