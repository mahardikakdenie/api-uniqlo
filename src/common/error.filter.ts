import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let status = 500;
    let message = 'An error occurred on the server, please try again later.';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = this.getHumanReadableMessage(exception.getResponse() as string);
    } else if (exception instanceof ZodError) {
      status = 400;
      message =
        'The request could not be processed because the data you sent is invalid.';
    }

    response.status(status).json({
      meta: {
        status: 'error',
        message: message,
        code: status,
      },
    });
  }

  private getHumanReadableMessage(error: string): string {
    // Map HTTP error messages to more user-friendly ones
    // For example: if error === 'Unauthorized', return 'Access denied'
    // You can customize this logic according to your application's needs
    switch (error) {
      case 'Unauthorized':
        return 'Access denied';
      default:
        return 'An error occurred on the server, please try again later.';
    }
  }
}
