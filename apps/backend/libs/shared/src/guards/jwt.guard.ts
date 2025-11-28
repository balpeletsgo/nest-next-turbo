import { PrismaService } from '@app/common/src/database';
import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    const token =
      req.headers.authorization?.split(' ')[1] ??
      req.headers['Authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      const payload = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.prisma.user.findFirst({
        where: {
          id: {
            equals: payload.id,
          },
        },
      });

      req.user = {
        id: user.id,
        role: user.role,
      };

      return true;
    } catch (error) {
      Logger.error('Error validating JWT token', error);
      throw new UnauthorizedException();
    }
  }
}
