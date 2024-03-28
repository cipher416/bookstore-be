import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common/decorators/modules';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2 days' },
    }),
  ],
})
export class AuthModule {}
