import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common/decorators/modules';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { BookModule } from './book/book.module';
// import { SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaService,
    CartModule,
    OrderModule,
    BookModule,
    // SwaggerModule,
  ],
  exports: [AppModule],
})
export class AppModule {}
