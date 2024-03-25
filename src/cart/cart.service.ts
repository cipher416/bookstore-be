import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { JWTUserData } from 'src/auth/auth.decorator';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}
  async create(createCartDto: CreateCartDto, user: JWTUserData) {
    await this.prismaService.cart.create({
      data: {
        BookId: createCartDto.bookId,
        UserId: user.userId,
        Quantity: createCartDto.quantity,
      },
    });
  }
  async removeAllByUserId(userId: string) {
    await this.prismaService.cart.deleteMany({
      where: {
        UserId: userId,
      },
    });
  }
}
