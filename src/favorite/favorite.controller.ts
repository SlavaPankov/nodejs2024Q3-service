import {
  Controller,
  Delete,
  Get, HttpCode, HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post(':type/:id')
  addFavorite(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.addFavorite(id, type);
  }

  @Delete(':type/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFavorite(
    @Param('type') type: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.deleteFavorite(id, type);
  }
}
