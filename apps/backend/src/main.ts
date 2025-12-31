import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 
import { ValidationPipe } from '@nestjs/common';
import { METHODS } from 'http';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Active la validation automatique des DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // supprime les champs non déclarés dans le DTO
    forbidNonWhitelisted: true, // renvoie une erreur si un champ inconnu est envoyé
    transform: true, // transforme automatiquement les types (string -> number, etc.)
  }));
  
  app.enableCors({
    origin: 'http://localhost:3000', // Your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
  await app.listen(process.env.PORT ?? 3001);

 }
bootstrap();
