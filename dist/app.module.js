"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const prisma_service_1 = require("./prisma.service");
const modules_1 = require("@nestjs/common/decorators/modules");
const cart_module_1 = require("./cart/cart.module");
const order_module_1 = require("./order/order.module");
const book_module_1 = require("./book/book.module");
const swagger_1 = require("@nestjs/swagger");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, modules_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            prisma_service_1.PrismaService,
            cart_module_1.CartModule,
            order_module_1.OrderModule,
            book_module_1.BookModule,
            swagger_1.SwaggerModule,
        ],
        exports: [AppModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map