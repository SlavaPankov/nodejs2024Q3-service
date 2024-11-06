import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [UsersModule, TrackModule],
})
export class AppModule {}
