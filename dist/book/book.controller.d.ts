import { BookService } from './book.service';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    findAll(page: number, searchString: string): Promise<{
        data: ({
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
        })[];
        nextCursor: number;
    }>;
}
