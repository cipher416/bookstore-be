import { BadRequestException, Injectable } from '@nestjs/common';
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
      include: {
        Book: true,
      },
    });
    const totalPrice = carts.reduce((total, cart) => {
      return total + cart.Quantity + cart.Book.BookPrice;
    }, 0);
    const userData = await this.prismaService.user.findFirst({
      where: {
        UserId: user.userId,
      },
    });
    if (userData.Points - totalPrice < 0) {
      throw new BadRequestException();
    }
    await this.prismaService.user.update({
      where: {
        UserId: userData.UserId,
      },
      data: {
        Points: userData.Points - totalPrice,
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
    console.log(page, itemPerPage);
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
