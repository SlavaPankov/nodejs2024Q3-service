import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { EErrorMessage } from '../types/messages';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  async findAll() {
    return this.db.tracks;
  }

  async findOne(id: string) {
    const currentTrack = this.db.tracks.find((track) => track.id === id);

    if (!currentTrack) {
      throw new NotFoundException(EErrorMessage.TRACK_NOT_FOUND);
    }

    return currentTrack;
  }
}
