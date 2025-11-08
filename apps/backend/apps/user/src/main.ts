import { ErrorFilter, CustomValidationPipe } from '@app/shared';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  const port = parseInt(process.env.USER_SERVICE_PORT) || 8001;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.USER ?? 'localhost',
        port: port,
      },
    },
  );
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalPipes(new CustomValidationPipe());

  await app.listen();

  Logger.log(
    `🚀 User microservice is listening at: http://${process.env.USER ?? 'localhost'}:${port}`,
  );
}
bootstrap();
