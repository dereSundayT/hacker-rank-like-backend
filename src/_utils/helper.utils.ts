import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import axios from 'axios';

//prettier-ignore
export const handleResponse = async (res: Response, data: any, message: string, statusCode: number, isSuccess: boolean,) => {
  return res.status(statusCode).json({ status: isSuccess, message, data, statusCode });
};

/**
 * Log error
 * @param error
 */
export const logError = async (error: any) => {
  console.log(error);
  try {
    const prismaService: PrismaService = new PrismaService();
    await prismaService.errorLog.create({
      data: {
        title: error.message,
        message: error,
      },
    });
  } catch (e) {
    const prismaService: PrismaService = new PrismaService();
    await prismaService.errorLog.create({
      data: {
        title: e.message,
        message: e.toString(),
      },
    });
  }
};

/**
 * Hash data
 * @param content
 */
export const hashData = async (content: string) => {
  return await bcrypt.hash(content, 12);
};
export const compareData = async (
  content: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(content, hash);
};

/*

 */
export const checkTestSubmissionStatus = async (token: string) => {
  try {
    const options = {
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': process.env.RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      },
    };
    const response = await axios.get(
      `${process.env.RAPID_API_URL}/${token}`,
      options,
    );
    const status = response.status;
    if (status >= 200 && status <= 299) {
      return { status: true, data: response.data, message: 'success' };
    }
  } catch (err) {
    console.log('err', err);
  }
  return { status: false, data: null, message: 'something went wrong' };
};
