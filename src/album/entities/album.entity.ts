import { IAlbum } from '../../types/album';
import { v4 } from 'uuid';

export class AlbumEntity implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor({ name, artistId, year }: Partial<IAlbum>) {
    this.id = v4();
    this.name = name;
    this.artistId = artistId;
    this.year = year;
  }
}
