import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...');

    const now = Date.now();
    // 如果中途抛出了异常，将不会走到 After...
    return next
      .handle()
      .pipe(tap(() => console.log(`<LoggingInterceptor> 请求共耗时 ${Date.now() - now}ms`)));
  }
}
