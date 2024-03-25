import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  findAll(searchString: string, page: number, itemPerPage: number) {
    return this.prismaService.book.findMany({
      where: {
        BookTitle: {
          contains: searchString,
        },
      },
      include: {
        BookTags: {
          include: {
            Tag: true,
          },
        },
      },
      skip: page * itemPerPage,
      take: itemPerPage,
    });
  }
}
