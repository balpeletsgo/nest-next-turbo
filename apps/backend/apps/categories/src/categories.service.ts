import { PrismaService } from '@app/shared/database/prisma.service';
import {
  CreateCategoriesDTO,
  UpdateCategoriesDTO,
} from '@app/shared/schemas/dto/categories.dto';
import { SlugService } from '@app/shared/slugify';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoriesResponse } from '@workspace/responses';

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    private slugService: SlugService,
  ) {}

  async create(request: CreateCategoriesDTO): Promise<CategoriesResponse> {
    const nameExists = await this.prisma.category.findFirst({
      where: {
        name: request.name,
        deletedAt: null,
      },
      select: {
        name: true,
        slug: true,
      },
    });

    if (nameExists) {
      throw new HttpException('Category already exists', HttpStatus.CONFLICT);
    }

    const categorySlug = this.slugService.slugify(request.name);

    return this.prisma.category.create({
      data: {
        name: request.name,
        slug: categorySlug,
        description: request.description,
      },
    });
  }

  async findAll(): Promise<CategoriesResponse[]> {
    return this.prisma.category.findMany({
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
      },
    });
  }

  async findBySlug(slug: string): Promise<CategoriesResponse> {
    const category = await this.prisma.category.findFirst({
      where: {
        slug: slug,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
      },
    });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  async update(
    id: string,
    request: UpdateCategoriesDTO,
  ): Promise<CategoriesResponse> {
    const category = await this.prisma.category.findUnique({
      where: { id, deletedAt: null },
    });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: {
        name: request.name || category.name,
        description: request.description || category.description,
        slug: this.slugService.slugify(request.name) || category.slug,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
      },
    });

    return updatedCategory;
  }

  async delete(id: string): Promise<CategoriesResponse> {
    const category = await this.prisma.category.findUnique({
      where: { id, deletedAt: null },
    });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
      },
    });
  }
}
