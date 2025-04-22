import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const config = new DocumentBuilder()
      .setTitle('Kafka EDA Test')
      .setDescription('NestJS Kafka + Swagger Example')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Kafka Microservice 리스너 설정
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'nestjs-kafka',
        brokers: ['kafka:29092'],
      },
      consumer: {
        groupId: 'nestjs-consumer-group',
      },
    },
  });

  await app.startAllMicroservices(); // ← 이것도 중요
  await app.listen(3000);
}
bootstrap();
