import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { EErrorMessage } from '../types/messages';
import { CreateTrackDto } from './dto/createTrack.dto';
import { TrackEntity } from './entity/user.entity';
import { EDbEntity } from '../types/dbentity';

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

  async create(body: CreateTrackDto) {
    const isExistsArtist = this.db.checkEntityExistence(
      body.artistId,
      EDbEntity.ARTISTS,
    );
    const isExistsAlbum = this.db.checkEntityExistence(
      body.albumId,
      EDbEntity.ALBUMS,
    );

    if (body.artistId && !isExistsArtist) {
      throw new NotFoundException(EErrorMessage.ARTIST_NOT_FOUND);
    }

    if (body.albumId && !isExistsAlbum) {
      throw new NotFoundException(EErrorMessage.ALBUM_NOT_FOUND);
    }

    const createdTrack = new TrackEntity(body);

    this.db.tracks.push(createdTrack);

    return createdTrack;
  }
}
