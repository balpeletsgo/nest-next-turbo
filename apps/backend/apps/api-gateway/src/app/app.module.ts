import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CategoriesModule } from '../categories/categories.module';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [AuthModule, UserModule, CategoriesModule, AuthorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
