import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    UsersModule,
    TrackModule,
    AlbumModule,
    ArtistModule,
    FavoriteModule,
  ],
})
export class AppModule {}
