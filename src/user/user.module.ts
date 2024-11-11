import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { DbModule } from '../db/db.module';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports: [DbModule],
})
export class UsersModule {}
