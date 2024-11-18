import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [PrismaModule],
})
export class ArtistModule {}
