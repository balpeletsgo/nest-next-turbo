import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
  Logger,
} from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const contextType = host.getType();
    let status: number;
    let message: string;
    let errors: any = undefined;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as any;
      status = exception.getStatus();
      message = exception.message;

      if (
        exceptionResponse &&
        typeof exceptionResponse === 'object' &&
        exceptionResponse.errors
      ) {
        message = exceptionResponse.message || 'Validation failed';
        errors = exceptionResponse.errors;
      }
    } else if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message || 'Internal server error';
      this.logger.error(
        `Unhandled exception: ${exception.message}`,
        exception.stack,
      );
    }

    const responseBody = {
      success: false,
      status,
      message,
      ...(errors && { errors }),
    };

    if (contextType === 'http') {
      const response = host.switchToHttp().getResponse();
      return response.status(status).json(responseBody);
    } else if (contextType === 'rpc') {
      // Ensure errors are explicitly included for RPC context
      return {
        success: false,
        status,
        message,
        errors: errors || undefined, // Return errors or undefined to be consistent
      };
    }

    return responseBody;
  }
}
