import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'old password must be a string' })
  @IsNotEmpty({ message: 'old password required' })
  oldPassword: string;

  @IsString({ message: 'new password must be a string' })
  @IsNotEmpty({ message: 'new password required' })
  newPassword: string;
}
