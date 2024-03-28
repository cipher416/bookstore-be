"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const cart_service_1 = require("../cart/cart.service");
let OrderService = class OrderService {
    prismaService;
    cartService;
    constructor(prismaService, cartService) {
        this.prismaService = prismaService;
        this.cartService = cartService;
    }
    async create(user) {
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
            throw new common_1.BadRequestException();
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
        const orders = carts.map((cart) => {
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
    findAll(userId, page, itemPerPage) {
        console.log(page, itemPerPage);
        return this.prismaService.orderHeader.findMany({
            where: {
                UserId: userId,
            },
            skip: page * itemPerPage,
            take: itemPerPage,
        });
    }
    async cancel(id) {
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
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cart_service_1.CartService])
], OrderService);
//# sourceMappingURL=order.service.js.map