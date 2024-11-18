import { Injectable, NotFoundException } from '@nestjs/common';
import { EErrorMessage } from '../types/messages';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const currentTrack = await this.prisma.track.findUnique({ where: { id } });

    if (currentTrack === null) {
      throw new NotFoundException(EErrorMessage.TRACK_NOT_FOUND);
    }

    return currentTrack;
  }

  async create(body: CreateTrackDto) {
    return this.prisma.track.create({ data: body });
  }

  async update(id: string, body: UpdateTrackDto) {
    const currentTrack = await this.prisma.track.findUnique({ where: { id } });

    if (currentTrack === null) {
      throw new NotFoundException(EErrorMessage.TRACK_NOT_FOUND);
    }

    return this.prisma.track.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string) {
    const currentTrack = await this.prisma.track.findUnique({ where: { id } });

    if (currentTrack === null) {
      throw new NotFoundException(EErrorMessage.TRACK_NOT_FOUND);
    }

    return this.prisma.track.delete({ where: { id } });
  }
}
