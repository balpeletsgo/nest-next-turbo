import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';

@Module({
  imports: [
    SharedModule,
    ClientsModule.register([
      {
        name: 'user_service',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST || 'localhost',
          port: process.env.USER_SERVICE_PORT
            ? parseInt(process.env.USER_SERVICE_PORT)
            : 8001,
        },
      },
    ]),
  ],
  providers: [JwtService],
  controllers: [UserController],
})
export class UserModule {}
