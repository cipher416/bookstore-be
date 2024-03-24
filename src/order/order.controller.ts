import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Request } from 'express';
import { JWTUserData } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Req() request: Request) {
    const user = request.user as JWTUserData;
    return this.orderService.create(user);
  }

  @Patch('/cancel/:id')
  update(@Param('id') id: string) {
    return this.orderService.cancel(id);
  }

  @Get()
  findAll(@Req() request: Request, @Query() page: number) {
    const user = request.user as JWTUserData;
    return this.orderService.findAll(user.userId, page, 10);
  }
}
