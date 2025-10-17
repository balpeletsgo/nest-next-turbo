import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
