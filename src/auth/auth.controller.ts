import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { AuthService } from './auth.service';
import { handleResponse, logError } from "../_utils/helper.utils";
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
      return handleResponse(res, null, 'something went wrong', 400, false);
    }
  }
}
