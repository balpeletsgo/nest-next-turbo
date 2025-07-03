import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [AuthModule, UserModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
