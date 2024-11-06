import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { EErrorMessage } from '../types/messages';

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
}
