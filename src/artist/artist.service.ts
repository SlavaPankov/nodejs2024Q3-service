import { Injectable, NotFoundException } from '@nestjs/common';
import { EErrorMessage } from '../types/messages';
import { ArtistEntity } from './entities/artist.entity';
import { CreateArtistDto } from './dto/createArtist.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const currentArtist = this.prisma.artist.findUnique({ where: { id } });

    if (!currentArtist) {
      throw new NotFoundException(EErrorMessage.ARTIST_NOT_FOUND);
    }

    return currentArtist;
  }

  async create(body: CreateArtistDto) {
    const createdArtist = new ArtistEntity(body);

    this.prisma.artist.create({ data: createdArtist });

    return createdArtist;
  }

  async update(id: string, body: CreateArtistDto) {
    try {
      return await this.prisma.artist.update({
        where: { id },
        data: body,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Artist with id ${id} not found`);
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.artist.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Artist with id ${id} not found`);
      }
      throw error;
    }
  }
}
