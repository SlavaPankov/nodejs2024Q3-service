import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  async findAll() {
    return this.db.users;
  }
}
