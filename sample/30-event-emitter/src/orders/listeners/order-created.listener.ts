import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/order-created.event';

@Injectable()
export class OrderCreatedListener {
  @OnEvent('order.created')
  async handleOrderCreatedEvent(event: OrderCreatedEvent) {
    // handle and process "OrderCreatedEvent" event
    await this.sleep(10 * 1000);
    console.log(event);
  }

  sleep(ms: number) {
    return new Promise(resolve =>  setTimeout(resolve, ms));
  }
}
