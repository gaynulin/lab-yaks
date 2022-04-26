import { Controller, Get, Param } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';
import { HerdService } from './herd.service';

@Controller('herd')
export class HerdController {
    constructor(private readonly herdService: HerdService, private readonly shopService: ShopService) {}

    @Get("/:t")
    public getHerd(@Param("t") day: number) {
        return this.herdService.getHerdDataByDay(day)
            .map(ShopService.extendWithLastShivedDay); 
    }
}
