import { IArtist } from '../../types/artist';
import { v4 } from 'uuid';

export class ArtistEntity {
  id: string;
  name: string;
  grammy: boolean;

  constructor({ name, grammy }: Partial<IArtist>) {
    this.id = v4();
    this.name = name;
    this.grammy = grammy;
  }
}
