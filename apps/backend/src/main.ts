import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // TODO: Change for production
    origin: "http://localhost:3000",
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}

bootstrap();
