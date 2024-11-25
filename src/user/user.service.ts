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
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(parseInt(process.env.CRYPT_SALT));

    return await bcrypt.hash(password, salt);
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (currentUser === null) {
      throw new NotFoundException(EErrorMessage.USER_NOT_FOUND);
    }

    return currentUser;
  }

  async create(createUserDto: CreateUserDto) {
    const login = createUserDto.login;
    const password = await this.hashPassword(createUserDto.password);

    const user = await this.prisma.user.create({ data: { login, password } });

    return new UserEntity(user);
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    const currentUser = await this.prisma.user.findUnique({ where: { id } });

    if (currentUser === null) {
      throw new NotFoundException(EErrorMessage.USER_NOT_FOUND);
    }

    const passwordMatches = await bcrypt.compare(
      oldPassword.trim(),
      currentUser.password.trim(),
    );

    if (!passwordMatches) {
      throw new HttpException(
        'Old password does not match',
        HttpStatus.FORBIDDEN,
      );
    }

    const hashedPassword = await this.hashPassword(newPassword);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword, version: { increment: 1 } },
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
