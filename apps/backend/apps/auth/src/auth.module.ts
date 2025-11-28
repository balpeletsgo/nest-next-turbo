import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CommonModule } from '@app/common';

@Module({
  imports: [CommonModule, SharedModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
