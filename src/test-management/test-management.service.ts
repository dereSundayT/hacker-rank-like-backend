import { Injectable } from '@nestjs/common';
import { ServiceResponseModel } from '../_utils/model';
import { msgs } from '../_utils/msg.utils';
import { logError } from '../_utils/helper.utils';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TestManagementService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * get test for user : 2 Tests
   */
  //prettier-ignore
  getTestForUserService = async (): Promise<ServiceResponseModel> => {
    try {
      //prettier-ignore
      const tests = await this.prismaService.test.findMany({});
      return {status:true, data: tests, message: msgs.user_fetched};

    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: msgs.general_err };
    }
  };

  //List Attempted Tests
  /**
   * get test for user : 2 Tests
   */
  //prettier-ignore
  getUserAttemptedTestService = async (user_id:number): Promise<ServiceResponseModel> => {
    try {
      const tests = await this.prismaService.userTest.findMany({
        where:{user_id:user_id},
        select:{
          test: true,
          user_test_details: true
        }
      });
      return {status:true, data: tests, message: msgs.user_fetched};

    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: msgs.general_err };
    }
  };

  //Admin User ONly
  //list of user with test results
}
