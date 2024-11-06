import { IUser } from '../../types/user';
import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';

export class UserEntity implements IUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor({ login, password }: Partial<IUser>) {
    this.id = v4();
    this.login = login;
    this.password = password;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    this.version = 1;
  }
}
