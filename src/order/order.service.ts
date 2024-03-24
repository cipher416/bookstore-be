import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JWTUserData } from 'src/auth/auth.decorator';
import { Cart, OrderDetail } from '@prisma/client';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    private prismaService: PrismaService,
    private cartService: CartService,
  ) {}
  async create(user: JWTUserData) {
    const carts = await this.prismaService.cart.findMany({
      where: {
        UserId: user.userId,
      },
    });
    const header = await this.prismaService.orderHeader.create({
      data: {
        OrderStatus: 'IN_PROGRESS',
        UserId: user.userId,
      },
    });
    const orders: OrderDetail[] = carts.map((cart: Cart) => {
      return {
        BookId: cart.BookId,
        Quantity: cart.Quantity,
        OrderId: header.OrderId,
      };
    });
    await this.prismaService.orderDetail.createMany({
      data: orders,
    });
    await this.cartService.removeAllByUserId(user.userId);
  }

  findAll(userId: string, page: number, itemPerPage: number) {
    return this.prismaService.orderHeader.findMany({
      where: {
        UserId: userId,
      },
      skip: page * itemPerPage,
      take: itemPerPage,
    });
  }

  async cancel(id: string) {
    const order = await this.prismaService.orderHeader.update({
      where: {
        OrderId: id,
      },
      data: {
        OrderStatus: 'CANCELED',
      },
    });
    return order;
  }
}
