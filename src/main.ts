import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger/setupSwagger';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await setupSwagger(app);

  await app.listen(port);

  console.log(`Server running on port ${port}`);
}
bootstrap();
