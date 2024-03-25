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
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({
    summary:
      "Inserts a user's cart items as into order and reduces the user's points.",
  })
  create(@Req() request: Request) {
    const user = request.user as JWTUserData;
    return this.orderService.create(user);
  }

  @Patch('/cancel/:id')
  @ApiOperation({
    summary: "Changes the selected order's status to CANCELED.",
  })
  update(@Param('id') id: string) {
    return this.orderService.cancel(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Gets all order items according to userId and page.',
  })
  async findAll(@Req() request: Request, @Query('page') page: number) {
    const user = request.user as JWTUserData;
    const data = await this.orderService.findAll(user.userId, page ?? 0, 10);
    return {
      data,
      nextCursor: ++page,
    };
  }
}
