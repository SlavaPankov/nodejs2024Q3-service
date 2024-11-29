import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UsersModule {}
