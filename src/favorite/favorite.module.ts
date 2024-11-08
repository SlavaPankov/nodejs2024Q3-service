import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';

@Module({
  imports: [DbModule],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
