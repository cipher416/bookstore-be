import { CreateCartDto } from './dto/create-cart.dto';
import { JWTUserData } from '../auth/auth.decorator';
import { PrismaService } from '../prisma.service';
export declare class CartService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createCartDto: CreateCartDto, user: JWTUserData): Promise<void>;
    removeAllByUserId(userId: string): Promise<void>;
}
