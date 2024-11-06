import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { EErrorMessage } from '../types/messages';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  async findAll() {
    return this.db.users;
  }

  async findOne(id: string) {
    const currentUser = this.db.users.find((user) => user.id === id);

    if (!currentUser) {
      throw new NotFoundException(EErrorMessage.USER_NOT_FOUND);
    }

    return currentUser;
  }

  async create(user: CreateUserDto) {
    const createdUser = new UserEntity(user);

    const currentUser = this.db.users.find(
      (userItem) => userItem.login === createdUser.login,
    );

    if (currentUser) {
      throw new HttpException(EErrorMessage.USER_EXISTS, HttpStatus.CONFLICT);
    }

    this.db.users.push(createdUser);

    return createdUser;
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const currentUser = await this.findOne(id);

    if (currentUser.password !== oldPassword) {
      throw new HttpException(
        EErrorMessage.PASSWORD_NOT_MATCH,
        HttpStatus.FORBIDDEN,
      );
    }

    currentUser.password = newPassword;
    currentUser.version += 1;
    currentUser.updatedAt = Date.now();

    return currentUser;
  }

  async delete(id: string) {
    const currentUser = await this.findOne(id);

    this.db.users = this.db.users.filter((user) => user.id !== currentUser.id);
  }
}
