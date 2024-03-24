import { Controller, Get, Req, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { Request } from 'express';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(
    @Req() request: Request,
    @Query('page') page: number,
    @Query('searchString') searchString: string,
  ) {
    const res = await this.bookService.findAll(
      searchString ?? '',
      page ?? 0,
      10,
    );
    return {
      data: res,
      nextCursor: ++page,
    };
  }
}
