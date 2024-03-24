import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  findAll(searchString: string, page: number, itemPerPage: number) {
    console.log(page, searchString);
    return this.prismaService.book.findMany({
      where: {
        BookTitle: {
          contains: searchString,
        },
      },
      skip: page * itemPerPage,
      take: itemPerPage,
    });
  }
}
