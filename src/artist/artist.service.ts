import { Injectable, NotFoundException } from '@nestjs/common';
import { EErrorMessage } from '../types/messages';
import { CreateArtistDto } from './dto/createArtist.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const currentArtist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (currentArtist === null) {
      throw new NotFoundException(EErrorMessage.ARTIST_NOT_FOUND);
    }

    return currentArtist;
  }

  async create(body: CreateArtistDto) {
    return this.prisma.artist.create({ data: body });
  }

  async update(id: string, body: CreateArtistDto) {
    const currentArtist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (currentArtist === null) {
      throw new NotFoundException(EErrorMessage.ARTIST_NOT_FOUND);
    }
    return this.prisma.artist.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string) {
    const currentArtist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (currentArtist === null) {
      throw new NotFoundException(EErrorMessage.ARTIST_NOT_FOUND);
    }

    return this.prisma.artist.delete({ where: { id } });
  }
}
