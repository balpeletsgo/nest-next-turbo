import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards/jwt.strategy';
import { PrismaService } from '@app/common/src/database';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    CommonModule,
  ],
  providers: [JwtStrategy, PrismaService],
  exports: [JwtModule, PassportModule],
})
export class SharedModule {}
