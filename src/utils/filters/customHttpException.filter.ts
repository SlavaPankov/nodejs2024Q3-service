import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EnhancedLoggingService } from 'src/logger/logger.service';
import { timeStamp } from '../timeStamp';

@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: EnhancedLoggingService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const responseMessage = exception.getResponse();
    const errorMessage =
      typeof responseMessage === 'object'
        ? (responseMessage as any).message
        : responseMessage;

    const errorResponse = {
      statusCode: exception.getStatus(),
      message: errorMessage,
      path: ctx.getRequest<Request>().url,
      timestamp: timeStamp(),
    };

    this.loggingService.error(errorResponse);
    ctx.getResponse<Response>().setHeader('Skip-Logging', 'true');
    ctx
      .getResponse<Response>()
      .status(exception.getStatus())
      .json(errorResponse);
  }
}
