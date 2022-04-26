import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HerdModule } from './herd/herd.module';
import { ShopModule } from './shop/shop.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    DatabaseModule, 
    HerdModule, ShopModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
