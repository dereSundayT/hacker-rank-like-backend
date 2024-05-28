import { Body, Controller, Get, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { AuthService } from './auth.service';
import { handleResponse, logError } from '../_utils/helper.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guard/auth.guard';
import { GetUserDetaillsDecorator } from './decorators/get-user-detaills.decorator';
import { UserModel } from '../_utils/model';
import { msgs } from '../_utils/msg.utils';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * user registration
   * @param res
   * @param createUserDto
   */
  @ApiOperation({ description: 'user registration' })
  @Post('register')
  async registerUser(
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      //prettier-ignore
      const respData = await this.authService.registerUserService(createUserDto);
      //prettier-ignore
      return handleResponse(res,respData.data,respData.message,respData.status?200:400,respData.status);
    } catch (e: any) {
      await logError(e);
      return handleResponse(res, null, msgs.general_err, 400, false);
    }
  }

  /**
   * user login
   * @param res
   * @param loginUserDto
   */
  @ApiOperation({ description: 'user login' })
  @Post('login')
  async login(@Res() res: Response, @Body() loginUserDto: LoginUserDto) {
    try {
      //prettier-ignore
      const respData = await this.authService.authenticateUserService(loginUserDto);
      //prettier-ignore
      return handleResponse(res,respData.data,respData.message,respData.status?200:400,respData.status);
    } catch (e: any) {
      await logError(e);
      return handleResponse(res, null, msgs.general_err, 400, false);
    }
  }

  /**
   * get user profile
   * @param res
   * @param user
   */
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get User Profile' })
  @UseGuards(AuthGuard)
  @Get('profile')
  async getUserProfile(
    @Res() res: Response,
    @GetUserDetaillsDecorator() user: UserModel,
  ) {
    try {
      //prettier-ignore
      const respData = await this.authService.getUserProfileService(user.email);
      //prettier-ignore
      return handleResponse(res,respData.data,respData.message,respData.status?200:400,respData.status);
    } catch (e: any) {
      await logError(e);
      return handleResponse(res, null, msgs.general_err, 400, false);
    }
  }

  /**
   * update user profile
   * @param res
   * @param updateUserDto
   * @param user
   */
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update User Profile' })
  @UseGuards(AuthGuard)
  @Patch('profile')
  async updateUserProfile(
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
    @GetUserDetaillsDecorator() user: UserModel,
  ) {
    try {
      //prettier-ignore
      const respData = await this.authService.updateUserDetailService(updateUserDto,user.email);
      //prettier-ignore
      return handleResponse(res,respData.data,respData.message,respData.status?200:400,respData.status);
    } catch (e: any) {
      await logError(e);
      return handleResponse(res, null, msgs.general_err, 400, false);
    }
  }
}
