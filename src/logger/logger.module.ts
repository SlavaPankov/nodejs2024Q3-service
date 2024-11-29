import { Module } from '@nestjs/common';
import { EnhancedLoggingService } from './logger.service';

@Module({
  exports: [EnhancedLoggingService],
  providers: [EnhancedLoggingService],
})
export class LoggerModule {}
