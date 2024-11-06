import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { EErrorMessage } from '../types/messages';
import { CreateTrackDto } from './dto/createTrack.dto';
import { TrackEntity } from './entity/user.entity';
import { EDbEntity } from '../types/dbentity';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  private async checkEntityExistence(body: {
    artistId?: string;
    albumId?: string;
  }) {
    if (body.artistId) {
      const isExistsArtist = this.db.checkEntityExistence(
        body.artistId,
        EDbEntity.ARTISTS,
      );
      if (!isExistsArtist) {
        throw new NotFoundException(EErrorMessage.ARTIST_NOT_FOUND);
      }
    }

    if (body.albumId) {
      const isExistsAlbum = this.db.checkEntityExistence(
        body.albumId,
        EDbEntity.ALBUMS,
      );
      if (!isExistsAlbum) {
        throw new NotFoundException(EErrorMessage.ALBUM_NOT_FOUND);
      }
    }
  }

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

  async create(body: CreateTrackDto) {
    await this.checkEntityExistence(body);

    const createdTrack = new TrackEntity(body);

    this.db.tracks.push(createdTrack);

    return createdTrack;
  }

  async update(id: string, body: UpdateTrackDto) {
    const currentTrack = await this.findOne(id);

    await this.checkEntityExistence(body);

    currentTrack.albumId = body.albumId;
    currentTrack.artistId = body.artistId;
    currentTrack.name = body.name;
    currentTrack.duration = body.duration;

    return currentTrack;
  }

  async delete(id: string) {
    const currentTrack = await this.findOne(id);

    this.db.tracks = this.db.tracks.filter(
      (track) => track.id !== currentTrack.id,
    );

    this.db.tracks = this.db.tracks.filter(
      (track) => track.id !== currentTrack.id,
    );
  }
}
