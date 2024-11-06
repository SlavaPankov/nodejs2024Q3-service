import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Login must be a string' })
  @IsNotEmpty({ message: 'Login required' })
  login: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password required' })
  password: string;
}
