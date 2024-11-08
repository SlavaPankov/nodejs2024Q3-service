import { Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('track/:id')
  createFavoriteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.createFavoriteTrack(id);
  }
}
