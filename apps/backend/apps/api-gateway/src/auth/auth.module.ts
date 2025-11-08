import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    SharedModule,
    ClientsModule.register([
      {
        name: 'auth_service',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST || 'localhost',
          port: process.env.AUTH_SERVICE_PORT
            ? parseInt(process.env.AUTH_SERVICE_PORT)
            : 8001,
        },
      },
    ]),
  ],
  providers: [],
  controllers: [AuthController],
})
export class AuthModule {}
