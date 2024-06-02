import { Body, Controller, Get, Param, Post, Res, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Response } from 'express';
import { handleResponse, logError } from '../_utils/helper.utils';
import { msgs } from '../_utils/msg.utils';
import { AuthGuard } from '../auth/guard/auth.guard';
import { GetUserDetaillsDecorator } from '../auth/decorators/get-user-detaills.decorator';
import { UserModel } from '../_utils/model';
import { TestManagementService } from '../test-management/test-management.service';
import { IsUserGuard } from '../auth/guard/is-user.guard';
import { SubmitTestDto } from "../test-management/dto/submit-test.dto";

@ApiTags('users test management')
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

  /**
   * get test details
   * @param res
   * @param test_id
   * @param user
   */
  @ApiOperation({ description: 'get test details' })
  @Get('test/:test_id')
  async getTestDetails(
    @Res() res: Response,
    @Param('test_id') test_id :string,
    @GetUserDetaillsDecorator() user: UserModel,
  ) {
    try {
      //prettier-ignore
      const respData = await this.testManagementService.getTestDetailsService(test_id)
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
   * @param test_id
   * @param submitTestDto
   * @param user
   */
  @ApiOperation({ description: 'submit user test' })
  @Post('test/:test_id')
  async submitTest(
    @Res() res: Response,
    @Param('test_id') test_id: string,
    @Body() submitTestDto: SubmitTestDto,
    @GetUserDetaillsDecorator() user: UserModel,
  ) {
    try {
      //prettier-ignore
      const respData = await this.testManagementService.submitTestService(user.id,Number(test_id),submitTestDto)
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
