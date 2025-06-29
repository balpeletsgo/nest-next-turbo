import { PrismaService } from '@app/shared/database';
import { UpdateProfileRequestDTO } from '@app/shared/schemas';
import { UserResponse } from '@workspace/responses';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async me(user: User): Promise<UserResponse> {
    if (!user || !user.id) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const foundUser = await this.prisma.user.findFirst({
      where: {
        id: {
          equals: user.id,
        },
      },
    });

    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
      isMember: foundUser.isMember,
    };
  }

  async update(
    user: User,
    request: UpdateProfileRequestDTO,
  ): Promise<UserResponse> {
    if (!user || !user.id) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: request.name,
      },
    });

    return {
      name: updatedUser.name,
    };
  }

  async profile(id: string): Promise<UserResponse> {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isMember: user.isMember,
    };
  }

  async allUsers(): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isMember: true,
      },
    });

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isMember: user.isMember,
    }));
  }
}
