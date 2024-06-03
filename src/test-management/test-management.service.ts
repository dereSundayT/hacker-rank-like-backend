import { Injectable } from '@nestjs/common';
import {
  CodeCompilationResp,
  ServiceResponseModel,
  UserModel,
} from '../_utils/model';
import { msgs } from '../_utils/msg.utils';
import { checkTestSubmissionStatus, logError } from '../_utils/helper.utils';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitTestDto } from './dto/submit-test.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TestManagementService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * get test details
   */
  //prettier-ignore
  submitTestService = async (user_id: number, test_id: number, submitTestDto: SubmitTestDto): Promise<ServiceResponseModel> => {
    try {
      if (test_id) {
        const test = await this.prismaService.test.findFirst({ where: { id: test_id } });
        if (test) {
          const checkStatusResp = await checkTestSubmissionStatus(submitTestDto.token);
          if (checkStatusResp.status) {
            const complicationResp: CodeCompilationResp = checkStatusResp.data;
            //Check if Test has be completed before
           const  userTestExists = await this.prismaService.userTest.findFirst({
              where:{
                user_id: user_id,
                test_id: test_id
              }
            })
            if(userTestExists){
              const testDetails :Prisma.UserTestDetailCreateInput = {
                status: complicationResp.status.description,
                is_passed: complicationResp.status.id === 3,
                user_submission: submitTestDto.user_submission,
                test_token: complicationResp.token,
                memory_used: complicationResp.memory,
                time_used: Number(complicationResp.time),
                compile_output: complicationResp.compile_output,
                user_test: { connect: { id: userTestExists.id } }
              }
              await this.prismaService.userTestDetail.create({ data:testDetails })

            }else{

              const userTestData: Prisma.UserTestCreateInput = {
                user: { connect: { id: user_id } },
                test: { connect: { id: test_id } },
                user_test_details: {
                  create: {
                    status: complicationResp.status.description,
                    is_passed: complicationResp.status.id === 3,
                    user_submission: submitTestDto.user_submission,
                    test_token: complicationResp.token,
                    memory_used: complicationResp.memory,
                    time_used: Number(complicationResp.time),
                    compile_output: complicationResp.compile_output
                  }
                }
              };
              //prettier-ignore
              await this.prismaService.userTest.create({ data: userTestData });
            }

            return { status: true, data: null, message: msgs.test_fetched };
          }
          return { status: false, data: null, message: checkStatusResp.message };
        }
        return { status: false, data: null, message: "invalid test id" };
      }
      return { status: false, data: null, message: "invalid test id" };
    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: msgs.general_err };
    }
  };

  /**
   * get test for user : 2 Tests
   */
  //prettier-ignore
  getTestForUserService = async (user: UserModel): Promise<ServiceResponseModel> => {
    try {
      const attempted_tests = await this.prismaService.userTest.findMany({
        where: { user_id: user.id },
        select: {
          test_id: true,
          user_id: true,
          user_test_details: true,
          test:{
            select:{
              question:true,
              description:true,
              test_category:true
            }
          }
        }
      });
      //get the ids test done by user
      const test_ids = attempted_tests.map((test) => test.test_id);
      //prettier-ignore
      const tests = await this.prismaService.test.findMany({where:{id:{notIn:test_ids}}});
      return { status: true, data: { attempted_tests, tests }, message: msgs.user_fetched };

    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: msgs.general_err };
    }
  };

  /**
   * get test details
   * @param test_id
   */
  //prettier-ignore
  getTestDetailsService = async (test_id: string): Promise<ServiceResponseModel> => {
    try {
      const id = Number(test_id);
      if (id) {
        //prettier-ignore
        const tests = await this.prismaService.test.findFirst({ where: { id } });
        return { status: true, data: tests, message: msgs.user_fetched };
      }
      return { status: false, data: null, message: "invalid test id" };


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
  getUserAttemptedTestService = async (user_id: number): Promise<ServiceResponseModel> => {
    try {
      const tests = await this.prismaService.userTest.findMany({
        where: { user_id: user_id },
        select: {
          test: true,
          user_test_details: true
        }
      });
      return { status: true, data: tests, message: msgs.user_fetched };

    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: msgs.general_err };
    }
  };

  //Admin User ONly
  /**
   * Get All Test
   */
  getUserTestForAdminService = async (): Promise<ServiceResponseModel> => {
    try {
      const user_tests = await this.prismaService.userTest.findMany({
        select: {
          test_id: true,
          user_id: true,
          user: true,
          user_test_details: true,
          test: {
            select: {
              question: true,
              description: true,
              test_category: true,
            },
          },
        },
      });
      return { status: true, data: user_tests, message: '' };
    } catch (e: any) {
      await logError(e);
      return { data: null, status: false, message: msgs.general_err };
    }
  };
  //list of user with test results
}
