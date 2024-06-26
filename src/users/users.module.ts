import { Module } from '@nestjs/common/decorators/modules';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
