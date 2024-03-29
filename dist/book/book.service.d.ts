import { PrismaService } from '../prisma.service';
export declare class BookService {
    private prismaService;
    constructor(prismaService: PrismaService);
    findAll(searchString: string, page: number, itemPerPage: number): import(".prisma/client").Prisma.PrismaPromise<({
        BookTags: ({
            Tag: {
                TagId: string;
                TagName: string;
            };
        } & {
            BookId: string;
            TagId: string;
        })[];
    } & {
        BookId: string;
        BookTitle: string;
        BookWriterName: string;
        BookImageURL: string;
        BookPrice: number;
    })[]>;
}
