import { Injectable } from '@nestjs/common';
import { EDbEntity } from '../types/dbentity';
import { IAlbum } from '../types/album';
import { IArtist } from '../types/artist';
import { UserEntity } from '../user/entity/user.entity';
import { TrackEntity } from '../track/entity/user.entity';

@Injectable()
export class DbService {
  users: UserEntity[] = [];
  albums: IAlbum[] = [];
  artists: IArtist[] = [];
  tracks: TrackEntity[] = [];

  favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  checkEntityExistence(entityId: string, entityType: EDbEntity) {
    return !!(
      this[entityType] as (UserEntity | TrackEntity | IArtist | IAlbum)[]
    ).find((entity) => entity.id === entityId);
  }
}
