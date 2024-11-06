import { v4 } from 'uuid';
import { ITrack } from '../../types/track';

export class TrackEntity implements ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor({ name, artistId, albumId, duration }: Partial<ITrack>) {
    this.id = v4();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
