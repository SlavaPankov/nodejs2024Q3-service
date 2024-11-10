import { Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post(':type/:id')
  createFavoriteTrack(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.addFavorite(id, type);
  }
}
