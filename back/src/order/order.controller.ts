import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { PlaceOrderDTO } from './dto/place-order.dto';
import { Response } from 'express';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post("/:t")
    public async placeOrder(
        @Param("t") day: number,
        @Body() request: PlaceOrderDTO,
        @Res({ passthrough: true }) response: Response): Promise<OrderDTO> {
        // todo to cast-decorator // Number(day)
        const order: OrderDTO = await this.orderService.placeOrder(Number(day), request)

        if(!order) {
            response.status(HttpStatus.NOT_FOUND);
            return null;
        }

        if(order.isParticial) {
            response.status(HttpStatus.PARTIAL_CONTENT);
        } else {
            response.status(HttpStatus.CREATED);   
        } 

        return order;
    }

    @Get() 
    public async get() {
        return await this.orderService.getAll();
    }

    @Get("/:id")
    public async getById(@Param("id") id: number) {
        return await this.orderService.getById(id);
    } 

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteOne(@Param("id") id: number) {
      await this.orderService.deleteOne(Number(id));
    }
}
