import { PrismaService } from '@app/shared/database';
import { SignInDTO, SignUpDTO, AuthResponse } from '@app/shared/schemas';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signUp(request: SignUpDTO): Promise<AuthResponse> {
    const { name, email, password } = request;

    const isUserExists = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (isUserExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async signIn(request: SignInDTO): Promise<AuthResponse> {
    const { email, password } = request;

    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: user.id, email: user.email, name: user.name };

    const token = await this.jwt.signAsync(payload, {
      algorithm: 'HS256',
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      access_token: token,
    };
  }
}
