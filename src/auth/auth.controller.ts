import { Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/createAuth.dto';
import { UpdateAuthDto } from './dto/updateAuth.dto';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  performLogin(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.performLogin(createAuthDto);
  }

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  performSignup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.performSignup(createAuthDto);
  }

  @Post('refresh')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  performTokenRefresh(@Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.performTokenRefresh(updateAuthDto);
  }
}
