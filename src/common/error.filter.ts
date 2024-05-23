import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { response } from 'express';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const responses = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
    } else if (exception instanceof ZodError) {
      responses.status(400).json({
        message: exception.message,
      });
    } else {
      responses.status(500).json({
        message: exception.message,
      });
    }
  }
}
