export interface IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface ICreateUserRequest {
  login: string;
  password: string;
}

export interface IUpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
