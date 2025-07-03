import { PrismaService } from '@app/shared/database/prisma.service';
import {
  CreateAuthorDTO,
  UpdateAuthorDTO,
} from '@app/shared/schemas/dto/author.dto';
import { SlugService } from '@app/shared/slugify';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthorResponse } from '@workspace/responses';

@Injectable()
export class AuthorService {
  constructor(
    private prisma: PrismaService,
    private slugService: SlugService,
  ) {}

  async create(request: CreateAuthorDTO): Promise<AuthorResponse> {
    const authorExists = await this.prisma.author.findFirst({
      where: {
        name: request.name,
        deletedAt: null,
      },
    });

    if (authorExists) {
      throw new HttpException('Author already exists', HttpStatus.CONFLICT);
    }

    const authorSlug = this.slugService.slugify(request.name);

    return this.prisma.author.create({
      data: {
        name: request.name,
        slug: authorSlug,
        bio: request.bio,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        bio: true,
      },
    });
  }

  async findAll(): Promise<AuthorResponse[]> {
    return this.prisma.author.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        bio: true,
      },
    });
  }

  async findBySlug(slug: string): Promise<AuthorResponse> {
    const author = await this.prisma.author.findFirst({
      where: {
        slug: slug,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        bio: true,
      },
    });

    if (!author) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }

    return author;
  }

  async update(id: string, request: UpdateAuthorDTO): Promise<AuthorResponse> {
    const author = await this.prisma.author.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        slug: true,
        bio: true,
      },
    });

    if (!author) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }

    const authorSlug = this.slugService.slugify(request.name);

    return this.prisma.author.update({
      where: { id },
      data: {
        name: request.name || author.name,
        bio: request.bio || author.bio,
        slug: authorSlug || author.slug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        bio: true,
      },
    });
  }

  async delete(id: string): Promise<AuthorResponse> {
    const author = await this.prisma.author.findUnique({
      where: { id, deletedAt: null },
    });

    if (!author) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.author.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        slug: true,
        bio: true,
      },
    });
  }
}
