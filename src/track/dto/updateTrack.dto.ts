import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateTrackDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name required' })
  name: string;

  @ValidateIf(({ artistId }) => artistId)
  @IsString({ message: 'artistId must be a string or null' })
  @IsUUID('4', {
    message: 'artistId must be a UUID v4 string',
    each: true,
  })
  artistId: string | null;

  @ValidateIf(({ albumId }) => albumId)
  @IsString({ message: 'artistId must be a string or null' })
  @IsUUID('4', {
    message: 'artistId must be a UUID v4 string',
    each: true,
  })
  albumId: string | null;

  @IsInt({ message: 'duration must be a number' })
  duration: number;
}
