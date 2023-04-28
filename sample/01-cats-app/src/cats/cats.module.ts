import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from 'src/common/interceptors/timeout.interceptor';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor
    }
  ],
})
export class CatsModule {}
