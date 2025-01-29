import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const origin = [
    configService.get<string>('frontendUrl'),
    configService.get<string>('slackUrl'),
  ];

  app.enableCors({ origin, credentials: true });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}

bootstrap();
