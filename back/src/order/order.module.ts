import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entity/order.entity';
import { HerdService } from '../herd/herd.service';
import { ShopService } from '../shop/shop.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, ShopService, HerdService],
  imports: [TypeOrmModule.forFeature([ Order ])]
})
export class OrderModule {}
