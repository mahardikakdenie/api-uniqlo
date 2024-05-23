import { Injectable } from '@nestjs/common';

@Injectable()
export class TransformerService<T> {
  response(
    data: T,
    message: string = 'Success',
    status: boolean = true,
    code: number = 200,
    additional: any = null,
  ) {
    const result: any = {
      meta: {
        status,
        message,
        code,
      },
    };

    if (data) {
      if (Array.isArray(data)) {
        result.data = data;
      } else if (typeof data === 'object' && data.constructor === Object) {
        result.data = data;
      }
    } else {
      result.data = [];
    }

    if (additional) {
      for (const add of additional) {
        result.meta[add.name] = add.data;
      }
    }

    return result;
  }

  exception(
    message: string = 'Error',
    error: any = null,
    status: boolean = false,
    code: number = 400,
  ) {
    const result: any = {
      meta: {
        status,
        message,
        code,
      },
    };

    if (error instanceof Error) {
      result.error = {
        message: error.message,
        file: error.stack,
      };
    } else {
      result.error = error;
    }

    return result;
  }
}
