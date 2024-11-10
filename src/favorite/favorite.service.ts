import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { EDbEntity } from '../types/dbentity';
import { EErrorMessage } from '../types/messages';

@Injectable()
export class FavoriteService {
  constructor(private db: DbService) {}

  async addFavorite(id: string, type: string) {
    switch (type) {
      case 'album':
      case 'track':
      case 'artist':
        const entity = `${type}s`;

        const isExistEntity = this.db.checkEntityExistence(
          id,
          EDbEntity[entity.toUpperCase()],
        );

        if (!isExistEntity) {
          throw new HttpException(
            `${type} with current id not found`,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        if (
          (this.db.favorites[entity] as string[]).some((item) => item === id)
        ) {
          throw new HttpException(
            'Favorite track already exists',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }

        this.db.favorites[entity].push(id);

        return `${type} added to your favorites`;
      default:
        throw new NotFoundException(`${type} doesn't exist`);
    }
  }
}
