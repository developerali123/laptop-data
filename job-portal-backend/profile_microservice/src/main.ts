import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import './common/prisma-enums';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // HTTP
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'profile_queue',
    },
  });

  await app.startAllMicroservices();
  const config = new DocumentBuilder()
    .setTitle('Profile MicroService')
    .setDescription('APIs for Profile MicroService')
    .setVersion('1.0')
    .addTag('Profile')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
