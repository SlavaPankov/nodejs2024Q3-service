import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  private async checkEntityExists(
    id: string,
    type: 'artist' | 'album' | 'track',
  ): Promise<boolean> {
    switch (type) {
      case 'artist':
        return !!(await this.prisma.artist.findUnique({ where: { id } }));

      case 'album':
        return !!(await this.prisma.album.findUnique({ where: { id } }));

      case 'track':
        return !!(await this.prisma.track.findUnique({ where: { id } }));

      default:
        return false;
    }
  }

  async addFavorite(id: string, type: 'artist' | 'album' | 'track') {
    const entityExists = await this.checkEntityExists(id, type);
    if (!entityExists) {
      throw new HttpException(
        `${type} with ID ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let favorite = await this.prisma.favorite.findFirst();
    if (favorite) {
      favorite = await this.prisma.favorite.update({
        where: { favoriteId: favorite.favoriteId },
        data: this.getUpdateData(type, id, favorite),
      });
    } else {
      favorite = await this.prisma.favorite.create({
        data: this.getCreateData(type, id),
      });
    }

    return favorite;
  }

  private getUpdateData(type: string, id: string, favorite: any) {
    const updateData = {};
    switch (type) {
      case 'artist':
        updateData['artists'] = { set: [...favorite.artists, id] };
        break;

      case 'album':
        updateData['albums'] = { set: [...favorite.albums, id] };
        break;

      case 'track':
        updateData['tracks'] = { set: [...favorite.tracks, id] };
        break;
    }
    return updateData;
  }

  private getCreateData(type: string, id: string) {
    const createData = { artists: [], albums: [], tracks: [] };
    switch (type) {
      case 'artist':
        createData.artists.push(id);
        break;

      case 'album':
        createData.albums.push(id);
        break;

      case 'track':
        createData.tracks.push(id);
        break;
    }
    return createData;
  }

  async findAll() {
    const favorite = await this.prisma.favorite.findFirst();

    if (!favorite) {
      return { artists: [], albums: [], tracks: [] };
    }

    const artists = await this.prisma.artist.findMany({
      where: { id: { in: favorite.artists } },
    });
    const albums = await this.prisma.album.findMany({
      where: { id: { in: favorite.albums } },
    });
    const tracks = await this.prisma.track.findMany({
      where: { id: { in: favorite.tracks } },
    });

    return { artists, albums, tracks };
  }

  async deleteFavorite(id: string, type: 'artist' | 'album' | 'track') {
    const favorite = await this.prisma.favorite.findFirst();

    if (!favorite) {
      throw new NotFoundException('Favorites not found');
    }

    switch (type) {
      case 'artist':
        if (!favorite.artists.includes(id)) {
          throw new NotFoundException(
            `Artist with ID ${id} not found in favorites`,
          );
        }
        await this.prisma.favorite.update({
          where: { favoriteId: favorite.favoriteId },
          data: {
            artists: {
              set: favorite.artists.filter((artistId) => artistId !== id),
            },
          },
        });
        break;

      case 'album':
        if (!favorite.albums.includes(id)) {
          throw new NotFoundException(
            `Album with ID ${id} not found in favorites`,
          );
        }
        await this.prisma.favorite.update({
          where: { favoriteId: favorite.favoriteId },
          data: {
            albums: {
              set: favorite.albums.filter((albumId) => albumId !== id),
            },
          },
        });
        break;

      case 'track':
        if (!favorite.tracks.includes(id)) {
          throw new NotFoundException(
            `Track with ID ${id} not found in favorites`,
          );
        }
        await this.prisma.favorite.update({
          where: { favoriteId: favorite.favoriteId },
          data: {
            tracks: {
              set: favorite.tracks.filter((trackId) => trackId !== id),
            },
          },
        });
        break;
      default:
        throw new NotFoundException(`Type ${type} is not valid`);
    }
  }
}
