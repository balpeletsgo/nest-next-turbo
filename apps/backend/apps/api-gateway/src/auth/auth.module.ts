import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from '@app/shared';

@Module({
  imports: [SharedModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
