import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import JwtAuthGuard from './auth/guards/jwtAuth.guard';
import { EnhancedLoggingService } from './logger/logger.service';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { FavoriteModule } from './favorite/favorite.module';
import { LoggerModule } from './logger/logger.module';
import { PrismaModule } from './prisma/prisma.module';
import { TrackModule } from './track/track.module';
import { UsersModule } from './user/user.module';
import { HttpRequestLoggerMiddleware } from './utils/httpRequestLoggerMiddleware';
import { CoreModule } from './utils/modules/coreModule';
import { CustomHttpExceptionFilter } from './utils/filters/customHttpException.filter';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    AlbumModule,
    ArtistModule,
    FavoriteModule,
    TrackModule,
    PrismaModule,
    LoggerModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: CustomHttpExceptionFilter,
    },
    EnhancedLoggingService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpRequestLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
