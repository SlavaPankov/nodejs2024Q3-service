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
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const currentUser = this.prisma.user.findUnique({ where: { id } });

    if (!currentUser) {
      throw new NotFoundException(EErrorMessage.USER_NOT_FOUND);
    }

    return currentUser;
  }

  async create(user: CreateUserDto) {
    const createdUser = new UserEntity(user);

    const currentUser = this.prisma.user.findUnique({
      where: { login: createdUser.login },
    });

    if (currentUser) {
      throw new HttpException(EErrorMessage.USER_EXISTS, HttpStatus.CONFLICT);
    }

    this.prisma.user.create({ data: user });

    return createdUser;
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const currentUser = await this.prisma.user.findUnique({ where: { id } });

    if (currentUser.password !== oldPassword) {
      throw new HttpException(
        EErrorMessage.PASSWORD_NOT_MATCH,
        HttpStatus.FORBIDDEN,
      );
    }

    this.prisma.user.update({
      where: { id },
      data: { password: newPassword, version: { increment: 1 } },
    });

    return currentUser;
  }

  async delete(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw error;
    }
  }
}
