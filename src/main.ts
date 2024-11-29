import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { setupSwagger } from './swagger/setupSwagger';
import { EnhancedLoggingService } from './logger/logger.service';
import { setupGlobalExceptionHandlers } from './utils/setupGlobalExceptionHandlers';

const defaultPort = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  const logger = await app.resolve(EnhancedLoggingService);
  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  setupSwagger(app);
  setupGlobalExceptionHandlers(logger);

  const PORT = process.env.PORT || defaultPort;
  await app.listen(PORT);

  logger.log(
    `\x1b[35mApplication is running on port: ${PORT}\x1b[0m`,
    'Bootstrap',
  );
  //TODO Here we will test unhandled exceptions and unhandled rejections and work with logger
  //Promise.reject('Test unhandled exceptions and unhandled rejections for logging');
  //throw new Error('Test unhandled exceptions and unhandled rejections for logging');
}

bootstrap();
