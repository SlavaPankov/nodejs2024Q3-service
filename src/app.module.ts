import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavoriteModule } from './favorite/favorite.module';
import { LoggerModule } from './logger/logger.module';
import { HttpRequestLoggerMiddleware } from './utils/httpRequestLoggerMiddleware';
import { CoreModule } from './utils/coreModule';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    TrackModule,
    AlbumModule,
    ArtistModule,
    FavoriteModule,
    LoggerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpRequestLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
