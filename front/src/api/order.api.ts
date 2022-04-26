import { OrderDTO } from "./dto/order.dto";
import { PlaceOrderDTO } from "./dto/create-order.dto";


export class OrderAPI {
    // TODO: provide BASE_URL through Docker.
    private static BASE_URL = "http://localhost:3001";

    public static async getAll(): Promise<OrderDTO[]> {
        const resp = await fetch(`${OrderAPI.BASE_URL}/orders`);
        const data = await resp.json();

        return data;
    }

    public static async createOne(day: number, request: PlaceOrderDTO): Promise<OrderDTO | null> {
        try {
            const resp = await fetch(`${OrderAPI.BASE_URL}/orders/${day}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            });
            const data = await resp.json();

            return data;
        } catch (error) {
            return null;
        }
    }

    public static async deleteOne(id: number) {
        await fetch(`${OrderAPI.BASE_URL}/orders/${id}`, { method: "DELETE" })
    }
}
