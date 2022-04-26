import { Module } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';
import { HerdController } from './herd.controller';
import { HerdService } from './herd.service';

@Module({
  controllers: [HerdController],
  providers: [HerdService, ShopService]
})
export class HerdModule {}
