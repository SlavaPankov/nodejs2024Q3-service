import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { EDbEntity } from '../types/dbentity';
import { ArtistEntity } from '../artist/entity/artist.entity';
import { TrackEntity } from '../track/entity/user.entity';
import { AlbumEntity } from '../album/entity/album.entity';

@Injectable()
export class FavoriteService {
  constructor(private db: DbService) {}

  private findEntities(
    entities: (ArtistEntity | TrackEntity | AlbumEntity)[],
    favorites: string[],
  ) {
    return favorites
      .map((id) => entities.find((item) => item.id === id))
      .filter((entity) => entity);
  }

  async findAll() {
    return {
      albums: this.findEntities(this.db.albums, this.db.favorites.albums),
      artists: this.findEntities(this.db.artists, this.db.favorites.artists),
      tracks: this.findEntities(this.db.tracks, this.db.favorites.tracks),
    };
  }

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
