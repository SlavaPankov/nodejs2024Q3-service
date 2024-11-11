import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name required' })
  name: string;

  @IsInt({ message: 'Name should be a number' })
  @IsNotEmpty({ message: 'Name required' })
  year: number;

  @ValidateIf(({ artistId }) => artistId)
  @IsUUID('4', {
    message: 'artistId must be a UUID v4 string',
    each: true,
  })
  @IsString({ message: 'artistId must be a string or null' })
  artistId: string | null;
}
