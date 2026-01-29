import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties not in the DTO
      forbidNonWhitelisted: true,
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  // ✅ Enable CORS
  app.enableCors({
    origin: '*', // Change this to your frontend URL in production
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ✅ Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Digital Invoice System APIs')
    .setDescription('API documentation for managing invoices')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Visit at http://localhost:3000/api

  await app.listen(5000);
}
bootstrap();
