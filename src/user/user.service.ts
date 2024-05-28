import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "../auth/dto/create-user.dto";
import { hashData, logError } from "../_utils/helper.utils";
import { ServiceResponseModel } from "../_utils/model";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * create user service
   * @param whereCondition
   */
  //prettier-ignore
  findUserService = async (whereCondition: any,): Promise<ServiceResponseModel> => {
    try {
      //prettier-ignore
      const user = await this.prismaService.user.findFirst({ where: whereCondition, });
      return { data: user, status: true, message: 'user fetched successfully' };
    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: 'something went wrong' };
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
        return { data: null, status: false, message: 'user already exists' };
      }
      const hashPassword = await hashData(createUserDto.password)
      //user data
      const newUserData:Prisma.UserCreateInput = {
        email: createUserDto.email,
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        password: hashPassword
      }
      await this.prismaService.user.create({ data:newUserData,});
      return {status: true, data: null, message: 'user created successfully'};
    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: 'something went wrong' };
    }
  };
}
