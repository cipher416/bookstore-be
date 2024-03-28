/// <reference types="cookie-parser" />
import { BookService } from './book.service';
import { Request } from 'express';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    findAll(request: Request, page: number, searchString: string): Promise<{
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
