import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { handleResponse, logError } from '../_utils/helper.utils';
import { msgs } from '../_utils/msg.utils';
import { AuthGuard } from '../auth/guard/auth.guard';
import { GetUserDetaillsDecorator } from '../auth/decorators/get-user-detaills.decorator';
import { UserModel } from '../_utils/model';
import { TestManagementService } from '../test-management/test-management.service';
import { IsUserGuard } from '../auth/guard/is-user.guard';

@UseGuards(IsUserGuard)
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private testManagementService: TestManagementService,
  ) {}

  /**
   * user registration
   * @param res
   * @param user
   */
  @ApiOperation({ description: 'get test for attempts' })
  @Get('tests')
  async getTests(
    @Res() res: Response,
    @GetUserDetaillsDecorator() user: UserModel,
  ) {
    try {
      //prettier-ignore
      const respData = await this.testManagementService.getTestForUserService()
      //prettier-ignore
      return handleResponse(res,respData.data,respData.message,respData.status?200:400,respData.status);
    } catch (e: any) {
      await logError(e);
      return handleResponse(res, null, msgs.general_err, 400, false);
    }
  }


  /**
   * submit user test
   * @param res
   * @param user
   */
  @ApiOperation({ description: 'submit user test' })
  @Post('tests/attempts')
  async submitTest(
    @Res() res: Response,
    @GetUserDetaillsDecorator() user: UserModel,
  ) {
    try {
      //prettier-ignore
      const respData = await this.testManagementService.getTestForUserService()
      //prettier-ignore
      return handleResponse(res,respData.data,respData.message,respData.status?200:400,respData.status);
    } catch (e: any) {
      await logError(e);
      return handleResponse(res, null, msgs.general_err, 400, false);
    }
  }



  /**
   * get attempted user test
   * @param res
   * @param user
   */
  @ApiOperation({ description: 'get attempted user test' })
  @Get('tests/attempts')
  async getAttemptedTest(
    @Res() res: Response,
    @GetUserDetaillsDecorator() user: UserModel,
  ) {
    try {
      //prettier-ignore
      const respData = await this.testManagementService.getUserAttemptedTestService(user.id)
      //prettier-ignore
      return handleResponse(res,respData.data,respData.message,respData.status?200:400,respData.status);
    } catch (e: any) {
      await logError(e);
      return handleResponse(res, null, msgs.general_err, 400, false);
    }
  }
}
