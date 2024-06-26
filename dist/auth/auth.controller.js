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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = require("./auth.service");
const core_1 = require("@nestjs/common/decorators/core");
const http_1 = require("@nestjs/common/decorators/http");
const jwt_1 = require("@nestjs/jwt");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    usersService;
    authService;
    jwtService;
    constructor(usersService, authService, jwtService) {
        this.usersService = usersService;
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async register(userData) {
        await this.usersService.addUser(userData.email, userData.password);
    }
    async login(userData, response) {
        const result = await this.authService.validateUser(userData.email, userData.password);
        if (!result) {
            throw new common_1.UnauthorizedException();
        }
        response.cookie('access_token', this.jwtService.sign({
            email: result.Email,
            userId: result.UserId,
        }));
        return {
            access_token: this.jwtService.sign({
                email: result.Email,
                userId: result.UserId,
            }),
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, http_1.Post)('/register'),
    (0, swagger_1.ApiOperation)({
        summary: 'Registers the user in the database.',
    }),
    __param(0, (0, http_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, http_1.Post)('/login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Verifies the user information against the database. Returns bearer token to client.',
    }),
    __param(0, (0, http_1.Body)()),
    __param(1, (0, http_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, core_1.Controller)('auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map