import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/createAuth.dto';
import { UpdateAuthDto } from './dto/updateAuth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
  ) {}

  performLogin(createAuthDto: CreateAuthDto) {
    return this.user.create(createAuthDto);
  }

  performSignup(createAuthDto: CreateAuthDto) {
    return `This action returns  auth`;
  }

  performTokenRefresh(updateAuthDto: UpdateAuthDto) {
    return `This action updates aauth`;
  }
}
