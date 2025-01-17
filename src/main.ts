import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression'; // Importa el paquete de compresión

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS
  app.enableCors();

  // Habilita compresión HTTP
  app.use(compression());

  // Configura el ValidationPipe global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Escucha en el puerto especificado por las variables de entorno o en el 3000
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`App running on port ${port}`);
}
bootstrap();
