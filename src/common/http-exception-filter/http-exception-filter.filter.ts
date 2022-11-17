import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Response, Request } from 'express';

@Catch()
export class HttpExceptionFilterFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();
    console.log(exception, '123');
    response.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
