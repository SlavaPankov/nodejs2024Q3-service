import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EErrorMessage } from '../types/messages';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const currentUser = await this.prisma.user.findUnique({ where: { id } });

    if (currentUser === null) {
      throw new NotFoundException(EErrorMessage.USER_NOT_FOUND);
    }

    return currentUser;
  }

  async create(user: CreateUserDto) {
    const createdUser = new UserEntity(user);

    const currentUser = await this.prisma.user.findUnique({
      where: { login: createdUser.login },
    });

    if (currentUser !== null) {
      throw new HttpException(EErrorMessage.USER_EXISTS, HttpStatus.CONFLICT);
    }

    const userData = await this.prisma.user.create({
      data: user,
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...userData,
      createdAt: userData.createdAt.getTime(),
      updatedAt: userData.updatedAt.getTime(),
    };
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const currentUser = await this.prisma.user.findUnique({ where: { id } });

    if (currentUser === null) {
      throw new NotFoundException(EErrorMessage.USER_NOT_FOUND);
    }

    if (currentUser.password !== oldPassword) {
      throw new HttpException(
        EErrorMessage.PASSWORD_NOT_MATCH,
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { password: newPassword, version: { increment: 1 } },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...updatedUser,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    };
  }

  async delete(id: string) {
    const currentUser = await this.prisma.user.findUnique({ where: { id } });

    if (currentUser === null) {
      throw new NotFoundException(EErrorMessage.USER_NOT_FOUND);
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
