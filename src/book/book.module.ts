import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BookController],
  exports: [BookService],
  providers: [BookService, PrismaService],
})
export class BookModule {}
