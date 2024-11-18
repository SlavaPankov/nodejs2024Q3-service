import { IsString, IsUUID, IsOptional, IsBoolean } from 'class-validator';

export class CreateFavoriteDto {
  @IsUUID()
  id: string; // ID для всех типов объектов

  @IsString()
  name: string;

  @IsOptional() // Если год есть только у альбомов, то делаем его опциональным
  year?: number;

  @IsOptional() // Если это альбом или трек, можно передавать artistId
  artistId?: string;

  @IsOptional() // Для треков, если необходимо, добавляем длительность
  duration?: number;

  @IsOptional() // Для артистов добавляем поле grammy
  @IsBoolean()
  grammy?: boolean;

  userId?: string; // Добавьте поле userId для связи с пользователем
}
