import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRole } from 'generated/prisma';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.role === UserRole.ADMIN) {
      return true;
    }

    return false;
  }
}
