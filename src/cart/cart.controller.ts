import { Post, Body, Req } from '@nestjs/common/decorators/http';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { JWTUserData } from '../auth/auth.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({
    summary: "Adds item along with quantity to user's cart.",
  })
  create(@Body() createCartDto: CreateCartDto, @Req() request: Request) {
    const user = request.user as JWTUserData;
    return this.cartService.create(createCartDto, user);
  }
}
