import { Injectable } from '@nestjs/common';
import { EDbEntity } from '../types/dbentity';
import { IUser } from '../types/user';
import { IAlbum } from '../types/album';
import { IArtist } from '../types/artist';
import { ITrack } from '../types/track';

@Injectable()
export class DbService {
  users: IUser[] = [];
  albums: IAlbum[] = [];
  artists: IArtist[] = [];
  tracks: ITrack[] = [];

  favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  checkEntityExistence(entityId: string, entityType: EDbEntity) {
    return !!(this[entityType] as (IUser | ITrack | IArtist | IAlbum)[]).find(
      (entity) => entity.id === entityId,
    );
  }
}
