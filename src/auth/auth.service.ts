import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from '../user/user.service';
import { ServiceResponseModel } from '../_utils/model';
import { compareData, logError } from '../_utils/helper.utils';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { msgs } from '../_utils/msg.utils';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * register user service
   * @param createUserDto
   */
  registerUserService = async (
    createUserDto: CreateUserDto,
  ): Promise<ServiceResponseModel> => {
    try {
      return await this.userService.createUserService(createUserDto);
    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: msgs.general_err };
    }
  };

  /**
   * authenticate user service
   * @param loginUserDto
   */
  authenticateUserService = async (
    loginUserDto: LoginUserDto,
  ): Promise<ServiceResponseModel> => {
    try {
      const userResp = await this.userService.findUserService({
        email: loginUserDto.email,
      });
      //Check if user exists
      if (userResp.status && userResp.data) {
        const user = userResp.data;
        //Validate password
        const passwordCheck = await compareData(
          loginUserDto.password,
          user.password,
        );
        if (passwordCheck) {
          //Generate Access Token
          const payload = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          };
          const access_token = await this.jwtService.signAsync(payload);
          //prettier-ignore
          return { data: {access_token}, status: true, message: 'user login successfully' };
        } else {
          return { data: null, status: false, message: msgs.invalid_cred };
        }
      }
    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: msgs.general_err };
    }
  };

  /**
   * get user profile
   * @param email
   */
  getUserProfileService = async (
    email: string,
  ): Promise<ServiceResponseModel> => {
    try {
      const userResp = await this.userService.findUserService({ email });
      const user = userResp.data;
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return {
          data: result,
          status: true,
          message: msgs.user_fetched,
        };
      }
      return {
        status: false,
        data: null,
        message: msgs.req_failed,
      };
    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: msgs.general_err };
    }
  };

  /**
   * update user profile
   * @param updateUserDto
   * @param email
   */
  //prettier-ignore
  updateUserDetailService = async (updateUserDto:UpdateUserDto,email:string): Promise<ServiceResponseModel> => {
    try {
      return await this.userService.updateUserService(updateUserDto,email);
    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: msgs.general_err };
    }
  };
}
