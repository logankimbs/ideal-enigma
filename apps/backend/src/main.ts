import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestExceptionFilter } from './common/filters/bad-request-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { BadRequestValidationPipe } from './common/pipes/bad-request-validation.pipe';

async function bootstrap() {
  // Todo: add raw body middleware for slack endpoints only
  const app = await NestFactory.create(AppModule, { rawBody: true });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const origin = [
    configService.get<string>('frontendUrl'),
    configService.get<string>('slackUrl'),
  ];

  app.enableCors({ origin, credentials: true });
  app.useGlobalPipes(new BadRequestValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new BadRequestExceptionFilter()
  );

  await app.listen(port);
}

bootstrap();
