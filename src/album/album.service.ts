import { Injectable, NotFoundException } from '@nestjs/common';
import { EErrorMessage } from '../types/messages';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (album === null) {
      throw new NotFoundException(EErrorMessage.ALBUM_NOT_FOUND);
    }

    return album;
  }

  async create(body: CreateAlbumDto) {
    return this.prisma.album.create({ data: body });
  }

  async update(id: string, body: UpdateAlbumDto) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (album === null) {
      throw new NotFoundException(EErrorMessage.ALBUM_NOT_FOUND);
    }

    return this.prisma.album.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (album === null) {
      throw new NotFoundException(EErrorMessage.ALBUM_NOT_FOUND);
    }

    return this.prisma.album.delete({ where: { id } });
  }
}
