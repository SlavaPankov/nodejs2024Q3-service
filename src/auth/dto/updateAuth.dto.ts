import { IsString, IsDefined, MinLength } from 'class-validator';

export class UpdateAuthDto {
  @IsString({ message: 'Refresh token must be a string' })
  @IsDefined({ message: 'Refresh token is required' })
  @MinLength(30, {
    message: 'Refresh token must be at least 30 characters long',
  })
  refreshToken: string;
}