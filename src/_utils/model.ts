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
}
