import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { EDbEntity } from '../types/dbentity';
import { EErrorMessage } from '../types/messages';

@Injectable()
export class FavoriteService {
  constructor(private db: DbService) {}

  async createFavoriteTrack(id: string) {
    const isExistTrack = this.db.checkEntityExistence(id, EDbEntity.TRACKS);

    if (!isExistTrack) {
      throw new HttpException(
        EErrorMessage.TRACK_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (this.db.favorites.tracks.some((item) => item === id)) {
      throw new HttpException(
        'Favorite track already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.favorites.tracks.push(id);
  }
}
