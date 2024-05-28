import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { hashData, logError } from '../_utils/helper.utils';
import { ServiceResponseModel } from '../_utils/model';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { msgs } from '../_utils/msg.utils';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * find user service
   * @param whereCondition
   */
  //prettier-ignore
  findUserService = async (whereCondition: any,): Promise<ServiceResponseModel> => {
    try {
      //prettier-ignore
      const user = await this.prismaService.user.findFirst({ where: whereCondition, });
      return { data: user, status: true, message: msgs.user_fetched };
    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: msgs.general_err };
    }
  };

  /**
   * create user service
   * @param createUserDto
   */
  //prettier-ignore
  createUserService = async (createUserDto: CreateUserDto):Promise<ServiceResponseModel> => {
    try{
      const checkUser = await this.findUserService({email: createUserDto.email});
      if(checkUser.data && checkUser.status){
        return { data: null, status: false, message: msgs.user_exits };
      }
      //hash password
      const hashPassword = await hashData(createUserDto.password)
      //user data
      const newUserData:Prisma.UserCreateInput = {
        email: createUserDto.email,
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        password: hashPassword
      }
      await this.prismaService.user.create({ data:newUserData,});
      return {status: true, data: null, message: msgs.user_created_s};
    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: msgs.general_err };
    }
  };

  /**
   * update user service
   * @param updateUserDto
   * @param email
   */
  //prettier-ignore
  updateUserService = async (updateUserDto: UpdateUserDto,email:string):Promise<ServiceResponseModel> => {
    try{
      const checkUser = await this.findUserService({email});
      if(checkUser.data && checkUser.status){
        //user data
        const updateUserData:Prisma.UserUpdateInput = {
          first_name: updateUserDto.first_name,
          last_name: updateUserDto.last_name,
          profile_url: updateUserDto.profile_image_url
        }
       const updatedUser = await  this.prismaService.user.update({
          where: {email},
          data:updateUserData,
          select:{
          id: true,
            email : true,
            profile_url: true,
            first_name: true,
            last_name: true
          }
        });
        return {status: true, data: updatedUser, message: 'user profile updated successfully'};
      }
      return {data:null, status: false, message: msgs.req_failed}

    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: msgs.general_err };
    }
  };
}
