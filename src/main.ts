import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

let app;

async function bootstrap() {
  app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.init();
}

bootstrap();

export default async (req, res) => {
  if (!app) {
    await bootstrap();
  }
  app.getHttpAdapter().getInstance()(req, res);
};
