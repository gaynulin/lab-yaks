import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { IStock, ShopService } from '../shop/shop.service';
import { OrderDTO } from './dto/order.dto';
import { PlaceOrderDTO } from './dto/place-order.dto';


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        private readonly shopService: ShopService
    ) { }

    public async placeOrder(day: number, { order, customer }: PlaceOrderDTO): Promise<OrderDTO> {
        const stock: IStock = this.shopService.getStockByDay(day);

        const { milk, skins } = order;
        const result: Partial<IStock> = {};
        let isParticial = false;

        if (milk && stock.milk < milk) {
            isParticial = true;
        } else {
            result.milk = milk;
        }

        if (skins && stock.skins < skins) {
            isParticial = true;
        } else {
            result.skins = skins;
        }

        if (!result.milk && !result.skins) {
            return null;
        }

        return await this.store(day, customer, result, isParticial);
    }

    public async getAll(): Promise<OrderDTO[]> {
        const orders: Order[] = await this.orderRepository.find();

        return orders.map(this.mapToDTO);
    }

    public async getById(id: number) {
        const order: Order = await this.orderRepository.findOne(id);
        if (!order) throw new NotFoundException(`The order id#${id} is not found`);

        return this.mapToDTO(order);
    }

    public async deleteOne(taskId: number) {
        const order: Order = await this.getById(taskId);
        await this.orderRepository.remove(order);
    }


    private async store(day: number, customer: string, result: Partial<IStock>, isParticial: boolean) {
        const order: Order = new Order();
        order.customer = customer;
        order.day = day;
        order.milk = result.milk || 0;
        order.skins = result.skins || 0;
        order.isParticial = isParticial;
        order.created = new Date();

        await this.orderRepository.save(order);

        return this.mapToDTO(order);
    }

    private mapToDTO(order: Order) {
        const orderDTO = new OrderDTO();
        orderDTO.id = order.id;
        orderDTO.customer = order.customer;
        orderDTO.day = order.day;
        orderDTO.milk = order.milk;
        orderDTO.skins = order.skins;
        orderDTO.created = order.created;
        orderDTO.isParticial = order.isParticial;

        return orderDTO;
    }
}
