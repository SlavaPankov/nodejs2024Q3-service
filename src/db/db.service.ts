import { Injectable } from '@nestjs/common';
import { EDbEntity } from '../types/dbentity';
import { IAlbum } from '../types/album';
import { IArtist } from '../types/artist';
import { ITrack } from '../types/track';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class DbService {
  users: UserEntity[] = [];
  albums: IAlbum[] = [];
  artists: IArtist[] = [];
  tracks: ITrack[] = [];

  favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  checkEntityExistence(entityId: string, entityType: EDbEntity) {
    return !!(
      this[entityType] as (UserEntity | ITrack | IArtist | IAlbum)[]
    ).find((entity) => entity.id === entityId);
  }
}
