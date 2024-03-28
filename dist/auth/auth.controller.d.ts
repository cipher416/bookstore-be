import { UsersService } from '../users/users.service';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
export declare class AuthController {
    private usersService;
    private authService;
    private jwtService;
    constructor(usersService: UsersService, authService: AuthService, jwtService: JwtService);
    register(userData: AuthDto): Promise<void>;
    login(userData: AuthDto, response: Response): Promise<{
        access_token: string;
    }>;
}
