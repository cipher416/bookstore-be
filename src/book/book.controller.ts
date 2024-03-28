import { Controller, Get, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiOperation({
    summary: 'Gets all books, according to page number and searchString.',
  })
  async findAll(
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
