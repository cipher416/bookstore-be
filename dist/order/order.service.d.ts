import { PrismaService } from '../prisma.service';
import { JWTUserData } from '../auth/auth.decorator';
import { CartService } from '../cart/cart.service';
export declare class OrderService {
    private prismaService;
    private cartService;
    constructor(prismaService: PrismaService, cartService: CartService);
    create(user: JWTUserData): Promise<void>;
    findAll(userId: string, page: number, itemPerPage: number): import("@prisma/client").Prisma.PrismaPromise<{
        UserId: string;
        OrderId: string;
        OrderStatus: import("@prisma/client").$Enums.OrderStatus;
        OrderDate: Date;
    }[]>;
    cancel(id: string): Promise<{
        UserId: string;
        OrderId: string;
        OrderStatus: import("@prisma/client").$Enums.OrderStatus;
        OrderDate: Date;
    }>;
}
