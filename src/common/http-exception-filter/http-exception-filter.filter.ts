import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Response, Request } from 'express';

type HttpErrorMessage = {
  errorMessage?: string;
};

@Catch()
export class HttpExceptionFilterFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const httpResponse: HttpErrorMessage = exception.getResponse() as Object;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...httpResponse,
    });
  }
}
