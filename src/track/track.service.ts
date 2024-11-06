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

  async update(id: string, body: UpdateTrackDto) {
    const currentTrack = await this.findOne(id);

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

    currentTrack.albumId = body.albumId;
    currentTrack.artistId = body.artistId;
    currentTrack.name = body.name;
    currentTrack.duration = body.duration;

    return currentTrack;
  }
}
