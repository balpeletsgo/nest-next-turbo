import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthorController } from './author.controller';

@Module({
  imports: [
    SharedModule,
    ClientsModule.register([
      {
        name: 'authors_service',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTHOR_SERVICE_HOST || 'localhost',
          port: process.env.AUTHOR_SERVICE_PORT
            ? parseInt(process.env.AUTHOR_SERVICE_PORT)
            : 8004,
        },
      },
    ]),
  ],
  providers: [JwtService],
  controllers: [AuthorController],
})
export class AuthorModule {}
