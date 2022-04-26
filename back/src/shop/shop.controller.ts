import { Controller, Get, Param } from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
    constructor(private readonly shopService: ShopService) {}

    @Get("/:t") 
    public getStock(@Param("t") day: number) {
        return this.shopService.getStockByDay(day);
    }
}
