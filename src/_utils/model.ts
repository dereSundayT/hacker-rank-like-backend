export interface ServiceResponseModel {
  data: any;
  message: string;
  status: boolean;
}

export interface UserModel {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_role: string;
}

export interface CodeCompilationResp {
  stdout: any;
  time: string;
  memory: number;
  stderr: any;
  token: string;
  compile_output: any;
  message: any;
  status: {
    id: number;
    description: string;
  };
}
