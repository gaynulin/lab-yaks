import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { HerdService } from '../herd/herd.service';

@Module({
  providers: [ShopService, HerdService],
  controllers: [ShopController]
})
export class ShopModule {}
