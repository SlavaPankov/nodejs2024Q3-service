import { Injectable, NotFoundException } from '@nestjs/common';
import { EErrorMessage } from '../types/messages';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException(EErrorMessage.ALBUM_NOT_FOUND);
    }

    return album;
  }

  async create(body: CreateAlbumDto) {
    return this.prisma.album.create({ data: body });
  }

  async update(id: string, body: UpdateAlbumDto) {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: body,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Album with id ${id} not found`);
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Album with id ${id} not found`);
      }
      throw error;
    }
  }
}
