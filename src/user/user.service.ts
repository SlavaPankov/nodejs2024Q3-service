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

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  async findAll() {
    return this.db.users;
  }

  async findById(id: string) {
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
}
