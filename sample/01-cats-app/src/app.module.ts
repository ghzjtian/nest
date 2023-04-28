import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CoreModule, CatsModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // 为某些 路由 去设置的中间件.
    // consumer.apply(LoggerMiddleware).forRoutes(CatsController);
    // 为全部 路由 去设置的中间件.
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
