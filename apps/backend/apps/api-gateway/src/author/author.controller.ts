import { AdminGuard } from '@app/shared/guards/admin.guard';
import { JwtAuthGuard } from '@app/shared/guards/jwt.guard';
import {
  CreateAuthorDTO,
  UpdateAuthorDTO,
} from '@app/shared/schemas/dto/author.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthorResponse, WebResponse } from '@workspace/responses';
import { lastValueFrom, TimeoutError } from 'rxjs';

@UseGuards(JwtAuthGuard)
@Controller('authors')
export class AuthorController {
  constructor(
    @Inject('authors_service')
    private readonly authorsClient: ClientProxy,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminGuard)
  async create(
    @Body() body: CreateAuthorDTO,
  ): Promise<WebResponse<AuthorResponse>> {
    try {
      const author = this.authorsClient.send('create_author', {
        body,
      });
      const result = await lastValueFrom(author);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'Authors service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Author created successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new HttpException('Service timeout', HttpStatus.GATEWAY_TIMEOUT);
      }

      throw error;
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<WebResponse<AuthorResponse[]>> {
    try {
      const authors = this.authorsClient.send('find_all_authors', {});
      const result = await lastValueFrom(authors);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'Authors service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Authors retrieved successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new HttpException('Service timeout', HttpStatus.GATEWAY_TIMEOUT);
      }

      throw error;
    }
  }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  async findBySlug(
    @Param('slug') slug: string,
  ): Promise<WebResponse<AuthorResponse>> {
    try {
      const author = this.authorsClient.send('find_author_by_slug', { slug });
      const result = await lastValueFrom(author);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'Authors service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Author retrieved successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new HttpException('Service timeout', HttpStatus.GATEWAY_TIMEOUT);
      }

      throw error;
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateAuthorDTO,
  ): Promise<WebResponse<AuthorResponse>> {
    try {
      const author = this.authorsClient.send('update_author', {
        id,
        body,
      });
      const result = await lastValueFrom(author);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'Authors service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Author updated successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new HttpException('Service timeout', HttpStatus.GATEWAY_TIMEOUT);
      }

      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  async delete(@Param('id') id: string): Promise<WebResponse<void>> {
    try {
      const author = this.authorsClient.send('delete_author', { id });
      const result = await lastValueFrom(author);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'Authors service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Author deleted successfully',
      };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new HttpException('Service timeout', HttpStatus.GATEWAY_TIMEOUT);
      }

      throw error;
    }
  }
}
