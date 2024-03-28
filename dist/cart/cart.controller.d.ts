/// <reference types="cookie-parser" />
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Request } from 'express';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    create(createCartDto: CreateCartDto, request: Request): Promise<void>;
}
