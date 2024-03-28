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
exports.UsersService = void 0;
const prisma_service_1 = require("../prisma.service");
const bcrypt_1 = require("bcrypt");
const core_1 = require("@nestjs/common/decorators/core");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addUser(email, password) {
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        await this.prisma.user.create({
            data: {
                Email: email,
                Password: hashedPassword,
            },
        });
    }
    async findOne(email, select) {
        return this.prisma.user.findFirst({
            where: {
                Email: email,
            },
            select: select,
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, core_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map