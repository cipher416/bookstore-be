/// <reference types="cookie-parser" />
import { OrderService } from './order.service';
import { Request } from 'express';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(request: Request): Promise<void>;
    update(id: string): Promise<{
        UserId: string;
        OrderId: string;
        OrderStatus: import(".prisma/client").$Enums.OrderStatus;
        OrderDate: Date;
    }>;
    findAll(request: Request, page: number): Promise<{
        data: {
            UserId: string;
            OrderId: string;
            OrderStatus: import(".prisma/client").$Enums.OrderStatus;
            OrderDate: Date;
        }[];
        nextCursor: number;
    }>;
}
