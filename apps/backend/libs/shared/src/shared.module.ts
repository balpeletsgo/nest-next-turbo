import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';
import { SlugService } from './slugify';

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
  ],
  providers: [PrismaService, JwtStrategy, SlugService],
  exports: [PrismaService, JwtModule, PassportModule, SlugService],
})
export class SharedModule {}
