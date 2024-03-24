import { Post, Body, Req } from '@nestjs/common/decorators/http';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { JWTUserData } from 'src/auth/auth.decorator';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto, @Req() request: Request) {
    const user = request.user as JWTUserData;
    return this.cartService.create(createCartDto, user);
  }
}
