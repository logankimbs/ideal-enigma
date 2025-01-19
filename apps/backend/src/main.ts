import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const origin = [
    configService.get<string>('origin.frontend'),
    configService.get<string>('origin.slack'),
  ];

  app.enableCors({ origin, credentials: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use(logger);

  await app.listen(port);

  console.log(`Application is running on port ${port}`);
}

bootstrap();
