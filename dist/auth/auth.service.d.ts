import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    validateUser(email: string, password: string): Promise<{
        UserId: string;
        Email: string;
        Password: string;
        Points: number;
    }>;
}
