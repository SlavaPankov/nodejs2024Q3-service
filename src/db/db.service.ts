import { Injectable } from '@nestjs/common';
import { EDbEntity } from '../types/dbentity';
import { UserEntity } from '../user/entity/user.entity';
import { TrackEntity } from '../track/entity/user.entity';
import { AlbumEntity } from '../album/entity/album.entity';
import { ArtistEntity } from '../artist/entity/artist.entity';

@Injectable()
export class DbService {
  users: UserEntity[] = [];
  albums: AlbumEntity[] = [];
  artists: ArtistEntity[] = [];
  tracks: TrackEntity[] = [];

  favorites: {
    artists: string[];
    tracks: string[];
    albums: string[];
  } = {
    artists: [],
    albums: [],
    tracks: [],
  };

  checkEntityExistence(entityId: string, entityType: EDbEntity) {
    return !!(
      this[entityType] as (
        | UserEntity
        | TrackEntity
        | AlbumEntity
        | ArtistEntity
      )[]
    ).find((entity) => entity.id === entityId);
  }
}
