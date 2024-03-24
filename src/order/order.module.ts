import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { CartModule } from 'src/cart/cart.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CartModule, JwtModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrderModule {}
