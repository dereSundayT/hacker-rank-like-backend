import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from '../user/user.service';
import { ServiceResponseModel } from '../_utils/model';
import { logError } from '../_utils/helper.utils';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  registerUserService = async (
    createUserDto: CreateUserDto,
  ): Promise<ServiceResponseModel> => {
    try {
      return await this.userService.createUserService(createUserDto);
    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: 'something went wrong' };
    }
  };
}
