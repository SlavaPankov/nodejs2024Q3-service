import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name required' })
  name: string;

  @IsBoolean({ message: 'Grammy must be a boolean' })
  @IsNotEmpty({ message: 'Grammy required' })
  grammy: boolean;
}
