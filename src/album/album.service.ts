import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { EErrorMessage } from '../types/messages';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { AlbumEntity } from './entity/album.entity';
import { EDbEntity } from '../types/dbentity';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

  async findAll() {
    return this.db.albums;
  }

  async findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException(EErrorMessage.ALBUM_NOT_FOUND);
    }

    return album;
  }

  async create(body: CreateAlbumDto) {
    if (body.artistId) {
      const isExistsArtist = this.db.checkEntityExistence(
        body.artistId,
        EDbEntity.ARTISTS,
      );
      if (!isExistsArtist) {
        throw new NotFoundException(EErrorMessage.ARTIST_NOT_FOUND);
      }
    }

    const createdAlbum = new AlbumEntity(body);

    this.db.albums.push(createdAlbum);

    return createdAlbum;
  }
}
