import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    addUser(email: string, password: string): Promise<void>;
    findOne(email: string, select: Prisma.UserSelect): Promise<User | undefined>;
}
