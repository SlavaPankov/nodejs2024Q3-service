import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { EErrorMessage } from '../types/messages';
import { ArtistEntity } from './entity/artist.entity';
import { CreateArtistDto } from './dto/createArtist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  async findAll() {
    return this.db.artists;
  }

  async findOne(id: string) {
    const currentArtist = this.db.artists.find((artist) => artist.id === id);

    if (!currentArtist) {
      throw new NotFoundException(EErrorMessage.ARTIST_NOT_FOUND);
    }

    return currentArtist;
  }

  async create(body: CreateArtistDto) {
    const createdArtist = new ArtistEntity(body);

    this.db.artists.push(createdArtist);

    return createdArtist;
  }

  async update(id: string, body: CreateArtistDto) {
    const currentArtist = await this.findOne(id);

    currentArtist.name = body.name;
    currentArtist.grammy = body.grammy;

    return currentArtist;
  }

  async delete(id: string) {
    const currentArtist = await this.findOne(id);

    if (!currentArtist) {
      throw new NotFoundException(EErrorMessage.ALBUM_NOT_FOUND);
    }

    this.db.tracks.forEach((track) => {
      if (track.artistId === currentArtist.id) {
        track.artistId = null;
      }
    });

    this.db.albums.forEach((album) => {
      if (album.artistId === currentArtist.id) {
        album.artistId = null;
      }
    });

    this.db.favorites.artists = this.db.favorites.artists.filter(
      (albumId) => albumId !== currentArtist.id,
    );

    this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
  }
}
