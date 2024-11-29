import { EnhancedLoggingService } from 'src/logger/logger.service';

export function setupGlobalExceptionHandlers(logger: EnhancedLoggingService) {
  process.on('uncaughtException', (error) => {
    logger.error('Unhandled exception', error.stack, 'UncaughtException');
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error(
      'Unhandled promise rejection',
      reason.toString(),
      'UnhandledRejection',
    );
  });
}
