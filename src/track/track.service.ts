import { Injectable, NotFoundException } from '@nestjs/common';
import { EErrorMessage } from '../types/messages';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const currentTrack = this.prisma.track.findUnique({ where: { id } });

    if (!currentTrack) {
      throw new NotFoundException(EErrorMessage.TRACK_NOT_FOUND);
    }

    return currentTrack;
  }

  async create(body: CreateTrackDto) {
    return this.prisma.track.create({ data: body });
  }

  async update(id: string, body: UpdateTrackDto) {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: body,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track with id ${id} not found`);
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track with id ${id} not found`);
      }
      throw error;
    }
  }
}
